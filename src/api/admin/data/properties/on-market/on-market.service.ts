import { Injectable, NotFoundException } from '@nestjs/common';
import { PropertyListingRepository } from 'src/api/repositories/postgres/property-listing.repository';
import { FilteredStatus } from 'src/api/enums/filtered-status.enum';
import { FilteringRepository } from 'src/api/repositories/mongodb/filtering.repository';
import { Admin } from 'src/api/entities/admin.entity';
import { Filtering } from 'src/api/schemas/filtering-logs.schema';
import { FilterStatesDto } from 'src/api/admin/data/properties/on-market/dto/filter-states.dto';
import { PropertyListing } from 'src/api/entities/property-listing.entity';
import { ListLogsDto } from 'src/api/admin/data/properties/on-market/dto/list-logs.dto';
import { HttpService } from '@nestjs/axios';
import * as zlib from 'zlib'
import { delay, firstValueFrom } from 'rxjs';
import { CreatePropertyListingDto } from 'src/api/admin/data/properties/on-market/dto/create-property-listing.dto';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ListSnapshotsDto } from 'src/api/admin/data/properties/on-market/dto/list-snapshots.dto';
import { BrightdataSnapshotRepository } from 'src/api/repositories/postgres/brightdata-snapshot.repository';
import { BrightdataSnapshot } from 'src/api/entities/brightdata-snapshot.entity';
import { StatesAbbreviation } from 'src/api/enums/states-abbreviation.enum';
import { StateRepository } from 'src/api/repositories/postgres/state.repository';
import { ListingsLARepository } from 'src/api/repositories/mongodb/listingsLA.repository';
import { FilterActionDto } from './dto/filter-action.dto';


@Injectable()
export class OnMarketService {

  constructor(
    private readonly stateRepository: StateRepository,
    private readonly propertyListingRepository: PropertyListingRepository,
    private readonly listingsLARepository: ListingsLARepository,
    private readonly filteringRepository: FilteringRepository,
    private readonly brightdataSnapshotRepository: BrightdataSnapshotRepository,
    private readonly httpService: HttpService,
  ) { }

  // -------------- PRIVATE FUNCTIONs  ----------------------------------------------------------------------------------------------
  // new method
  private async decompressData(stream: NodeJS.ReadableStream): Promise<string> {
    const chunks: Buffer[] = [];
    const gunzip = zlib.createGunzip();
    return new Promise((resolve, reject) => {
      stream.pipe(gunzip)
        .on('data', (chunk) => chunks.push(chunk))
        .on('end', () => resolve(Buffer.concat(chunks).toString()))
        .on('error', reject);
    });
  }

  // new method - reusable trigger scrape
  private async triggerScrape(data): Promise<{
    snapshot_id: string
  }> {
    // CHANGE LINK HERE FOR NOTIFICATION ONCE DOMAIN IS CHANGED 
    const url = 'https://api.brightdata.com/datasets/v3/trigger?dataset_id=gd_lfqkr8wm13ixtbd8f5&notify=https://uniqueproject-229b37d9b8ca.herokuapp.com/api/admin/data/properties/on-market/brightdata/notifications&format=json&type=discover_new&discover_by=url';

    const headers = {
      Authorization: `Bearer ${process.env.BRIGHTDATA_API_TOKEN}`,
      'Content-Type': 'application/json',
    };


    try {
      // Make POST request using the httpService (make sure to inject httpService in your class)
      const response = await firstValueFrom(this.httpService.post(url, data, { headers }));

      // Check if snapshot_id is present in the response and return it
      const snapshot_id = response.data.snapshot_id
      if (snapshot_id) {
        console.log("Snapshot ID: " + response.data.snapshot_id);

        return snapshot_id;
      } else {
        // Handle case where snapshot_id is not returned
        throw new Error('Snapshot ID not found in the response.');
      }
    } catch (error) {
      // Handle errors properly, and return or log for debugging
      console.error('Error sending POST request:', error.response?.data || error.message);
      throw new Error(`Error sending POST request: ${error.message}`);
    }
  }

  private async pullData(snapshot_id:string) {
    // Fetch the snapshot data from BrightData API snapshot_id
    const url = `https://api.brightdata.com/datasets/v3/snapshot/${snapshot_id}?compress=true&format=json`;
    const headers = { Authorization: `Bearer ${process.env.BRIGHTDATA_API_TOKEN}` };

    try {
      const response = await firstValueFrom(
        this.httpService.request({ url, method: 'GET', headers, responseType: 'stream', timeout: 10000 })
      );

      const decompressedData = await this.decompressData(response.data);

      const jsonData = JSON.parse(decompressedData.toString());

      const snapshot = await this.brightdataSnapshotRepository.findOne({ where: { brightdata_id: snapshot_id } })



      if (Array.isArray(jsonData)) {

        for (const item of jsonData) {

          const zpid = item.zpid || null;
          const homeStatus = item.homeStatus || null;
          const streetAddress = item.address?.streetAddress || null;
          const city = item.address?.city || null;
          const zipcode = item.address?.zipcode || null;
          const state = item.address?.state || null;

          const bedrooms = item.interior?.bedrooms_and_bathrooms?.bedrooms ? parseInt(item.interior.bedrooms_and_bathrooms.bedrooms, 10) : null;
          const bathrooms = item.interior?.bedrooms_and_bathrooms?.bathrooms ? parseInt(item.interior.bedrooms_and_bathrooms.bathrooms, 10) : null;

          const price = item.price ? parseFloat(item.price) : null;
          const longitude = item.longitude || null;
          const latitude = item.latitude || null;
          const livingArea = item.livingArea ? parseFloat(item.livingArea) : null;
          const livingAreaUnitsShort = item.livingAreaUnitsShort || null;
          const homeType = item.homeType || null;
          const parcelId = item.parcelId || null;
          const hdpTypeDimension = item.hdpTypeDimension || null;
          const photoCount = item.photoCount ? parseInt(item.photoCount, 10) : null;


          //listing_provided_by
          const lpb_name = item.listing_provided_by?.name || null;
          const lpb_email = item.listing_provided_by?.email || null;
          const lpb_company = item.listing_provided_by?.company || null;
          const lpb_phone_number = item.listing_provided_by?.phone_number || null;

          const isNonOwnerOccupied = item.isNonOwnerOccupied || null;

          const photos = [];

          if (item.photos && Array.isArray(item.photos)) {
            item.photos.forEach(photo => {
              // Check if mixedSources exists and has jpeg array
              const jpegImages = photo.mixedSources?.jpeg;

              // Filter jpeg images for those with width of 576
              if (jpegImages) {
                jpegImages.forEach(image => {
                  if (image.width === 576) {
                    photos.push(image.url); // Push the URL to photos array
                  }
                });
              }
            });
          }
          const county = item.livingArea || null;


          const additionalInfo = {
            yearBuilt: item.yearBuilt || null,
            listingDataSource: item.listingDataSource || null,
            hasBadGeocode: item.hasBadGeocode || null,
            lotSize: item.lotSize || null,
            lotAreaValue: item.lotAreaValue || null,
            lotAreaUnits: item.lotAreaUnits || null,
            livingAreaValue: item.livingAreaValue || null,
            ssid: item.ssid || null,
            hdpUrl: item.hdpUrl || null,
            livingAreaUnits: item.livingAreaUnits || null,
            isNonOwnerOccupied: item.isNonOwnerOccupied || null,
            daysOnZillow: item.daysOnZillow || null,
            brokerageName: item.brokerageName || null,
            propertyTypeDimension: item.propertyTypeDimension || null,
            timeZone: item.timeZone || null,
            url: item.url || null,
            countyFIPS: item.countyFIPS || null,
            countyID: item.countyID || null,
            listingTypeDimension: item.listingTypeDimension || null,
            postingContact: item.postingContact || null,
            isOffMarket: item.isOffMarket || null,
            overview: item.overview || {},
            is_listed_by_management_company: item.is_listed_by_management_company || null,
            mls_id: item.mls_id || null,
            timestamp: item.timestamp || null,
            input: item.input || {},
            listing_provided_by: {
              name: item.listing_provided_by?.name || null,
              email: item.listing_provided_by?.email || null,
              company: item.listing_provided_by?.company || null,
              phone_number: item.listing_provided_by?.phone_number || null
            }
          };

          const propertyListingDto = new CreatePropertyListingDto();
          propertyListingDto.zpid = zpid;
          propertyListingDto.home_status = homeStatus;
          propertyListingDto.streetAddress = streetAddress;
          propertyListingDto.city = city;
          propertyListingDto.zipcode = zipcode;
          propertyListingDto.state = state;
          propertyListingDto.bedrooms = bedrooms;
          propertyListingDto.bathrooms = bathrooms;
          propertyListingDto.price = price;
          propertyListingDto.longitude = longitude;
          propertyListingDto.latitude = latitude;
          propertyListingDto.livingArea = livingArea;
          propertyListingDto.livingAreaUnitsShort = livingAreaUnitsShort;
          propertyListingDto.homeType = homeType;
          propertyListingDto.parcelId = parcelId;
          propertyListingDto.hdpTypeDimension = hdpTypeDimension;
          propertyListingDto.photoCount = photoCount;
          propertyListingDto.photos = photos;
          propertyListingDto.county = county;
          propertyListingDto.additionalInfo = additionalInfo;
          propertyListingDto.snapshot = snapshot


          propertyListingDto.lpb_name = lpb_name;
          propertyListingDto.lpb_email = lpb_email;
          propertyListingDto.lpb_company = lpb_company;
          propertyListingDto.lpb_phone_number = lpb_phone_number;
          propertyListingDto.isNonOwnerOccupied = isNonOwnerOccupied;


          const zpidExist = await this.propertyListingRepository.findOne({ where: { zpid }, relations: ['snapshot'] });
          
          if (zpidExist) {




            const snapshot = await this.brightdataSnapshotRepository.findOne({ where: { brightdata_id: snapshot_id }, relations: ['duplicatesProperties'] })

            // Initialize duplicatesProperties if not already done
            if (!snapshot.duplicatesProperties) {
              snapshot.duplicatesProperties = [];
            }

            // Check if zpidExist is already in duplicatesProperties
            const alreadyExists = snapshot.duplicatesProperties.some(property => property.zpid === zpidExist.zpid);
            if (alreadyExists) {
              console.log("This zpid already exist WITHIN same snapshot")
              continue
            }
            snapshot.duplicatesProperties.push(zpidExist); // Add to the duplicatesProperties array
            snapshot.duplicatesCount = snapshot.duplicatesCount + 1
            snapshot.count = snapshot.count - 1
            await this.brightdataSnapshotRepository.save(snapshot)
            console.log("This zpid already exist: " + zpid)
            continue;
          } 
          //await this.propertyListingRepository.createProperty(propertyListingDto)
          await this.listingsLARepository.createProperty(propertyListingDto)
        };
        return { message: "Successfully processed the job" };
      } else {
        console.error("jsonData is not an array");
        return { message: "Error: jsonData is not an array" };
      }
    } catch (error) {
      console.error("Error fetching or processing data:", error);
      return { message: "Error fetching data" };
    }
  }


  private async monitorStatus(snapshot_id) {
    const url = `https://api.brightdata.com/datasets/v3/progress/${snapshot_id}`

    const headers = { Authorization: `Bearer ${process.env.BRIGHTDATA_API_TOKEN} ` }

    try {
      const response = await firstValueFrom(this.httpService.get(url, { headers }))
      return response.data
    } catch (error) {
      console.log(error)
    }


  }




  // --------------- CRON FUNCTIONS ----------------------------------------------------------------------------------------------
  @Cron(CronExpression.EVERY_DAY_AT_6AM) // change this to 6AM after testing
  async cronHandler() {
    console.log('Triggering daily sendPostRequest...');
    await this.sendCronRequest()
  }

  // new method - cron request   
  private async sendCronRequest() {

    const states = await this.stateRepository.statesDaily()

    if (states.length > 0) {

      for (const state of states) {

        const data = { url: state.zillow_url_new }

        const snapshot_id = await this.triggerScrape(data)

        console.log("Snapshot ID:" + snapshot_id)
        console.log("State ID:" + state.id)
        console.log("State Abbreviation:" + state.abbreviation)
        await this.brightdataSnapshotRepository.logSnapshot(snapshot_id, state.id)

      }
    } else {
      console.log("No active states found")
    }

  }


  // ---- PUBLIC ROUTES  ----------- PUBLIC ROUTES ----------- PUBLIC ROUTES  ------------------------------------------------------------

  // ---------------  PUBLIC ROUTES /filter  ----------------------------------------------------------------------------------------------

  async filterStatesList(): Promise<{
    response: {
      state:string,
      state_abbreviation: string,
      countUnfiltered: number
    }[]

  }> {
    const states = await this.stateRepository.statesDaily()
    const response = []
    for (const state of states) {
      const countUnfiltered =
        await this.propertyListingRepository.countUnfiltered(
          state.abbreviation,
        );
      //if(countUnfiltered>0){

      response.push({
        state: state.id,
        state_abbreviation: state.abbreviation,
        countUnfiltered: countUnfiltered,
      });
      // }
    }

    return { response}
  }
  //active
  async filterStates(state: StatesAbbreviation, filterStateDto: FilterStatesDto): Promise<{
    properties: PropertyListing[],
    propertiesCount: number,
    limit: number,
    offset: number,
    totalPages: number,
    currentPage: number
  }> {
    return await this.propertyListingRepository.filterStates(state, filterStateDto)
  }


  //active
  async filteringAction(propertyId: string, admin: Admin, action: FilteredStatus):Promise<{
    message:string
  }> {
    await this.filteringRepository.createFilteringLog(propertyId, admin, action)
    const filterActionDto = new FilterActionDto()
    filterActionDto.propertyId = propertyId
    filterActionDto.action = action
    
    await this.propertyListingRepository.filterAction(filterActionDto)
    return { message: "Successfully filtered"}
  }


  //active
  async listLogs(listLogsDto: ListLogsDto): Promise<Filtering[]> {
    return this.filteringRepository.listLogs(listLogsDto)
  }


  // --------------- PUBLIC ROUTES /brightdata ----------------------------------------------------------------------------------------------
  //active
  async notificationBrightdata(payload): Promise<{ message: string }> {
    if (!payload.snapshot_id) {
      throw new NotFoundException("Snapshot ID is not found.");
    }

    // Fetch snapshot and relations
    const snapshot = await this.brightdataSnapshotRepository.findOne({
      where: { brightdata_id: payload.snapshot_id }
    });


    // Wait for 5 seconds
    await delay(5000); // 5000 milliseconds = 5 seconds

    // Only save and proceed if status is 'ready'
    if (payload.status === "ready") {
      snapshot.status = payload.status;

      const moreInfo = await this.monitorStatus(payload.snapshot_id)

      snapshot.count = Number(moreInfo.records)

      snapshot.errors = Number(moreInfo.errors)

      await this.brightdataSnapshotRepository.save(snapshot);
      console.log(`Processing snapshot with BrightData ID: ${snapshot.brightdata_id}`);

      return await this.pullData(snapshot.brightdata_id)

    }

    // Log if the status is not 'ready'
    console.log("Status is not ready...");
    return { message: "Status is not ready" };
  }

  //active
  async listSnapshots(listSnapshotsDto: ListSnapshotsDto): Promise<{
    result: BrightdataSnapshot[],
    totalRecords: number,
    totalPages: number,
    currentPage: number,
    limit: number,
    offset: number
  }> {
    return this.brightdataSnapshotRepository.listSnapshots(listSnapshotsDto)
  }

  //active
  async runScrapperState(stateAbbrevation: string): Promise<{
    message: string
  }> {
    const state = await this.stateRepository.findOne({ where: { abbreviation: stateAbbrevation } })
    if (!state) {
      throw new NotFoundException("State with provided Abbreviation does not exist.")
    }

    const data = { url: state.zillow_url_new }
    const snapshotId = await this.triggerScrape(data)

    return await this.brightdataSnapshotRepository.logSnapshot(snapshotId, state.id)

  }

  //active
  async fetchSnapshot(snapshotId: string): Promise<{
    message: string
  }> {
    const snapshot = await this.brightdataSnapshotRepository.findOne({
      where: { brightdata_id: snapshotId }
    });

    if (!snapshot) {
      throw new NotFoundException("Snapshot with this BrightData ID does not exist.");
    }

    return await this.pullData(snapshot.brightdata_id)

  }



}
