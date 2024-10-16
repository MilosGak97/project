import { Injectable, NotFoundException } from '@nestjs/common';
import { PropertyListingRepository } from 'src/api/repositories/postgres/property-listing.repository';
import { FilteredStatus } from 'src/api/enums/filtered-status.enum';
import { FilteringRepository } from 'src/api/repositories/mongodb/filtering.repository';
import { Admin } from 'src/api/entities/admin.entity';
import { Filtering } from 'src/api/schemas/filtering-logs.schema';
import { MarketRepository } from 'src/api/repositories/market.repository';
import { ListMarketsDto } from 'src/api/admin/zillow-scrapper/dto/list-markets.dto';
import { FilterMarketDto } from 'src/api/admin/filtering-feature/dto/filter-market.dto';
import { PropertyListing } from 'src/api/entities/property-listing.entity';
import { ListLogsDto } from 'src/api/admin/filtering-feature/dto/list-logs.dto';
import { ZillowScrapperSnapshotRepository } from 'src/api/repositories/postgres/zillow-scrapper-snapshot.repository';
import { HttpService } from '@nestjs/axios';
import { CountyRepository } from 'src/api/repositories/county.repository';
import * as zlib from 'zlib'
import { delay, firstValueFrom } from 'rxjs';
import { CreatePropertyListingDto } from 'src/api/admin/zillow-scrapper/dto/create-property-listing.dto';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CreateMarketDto } from 'src/api/admin/zillow-scrapper/dto/create-market.dto';
import { Market } from 'src/api/entities/market.entity';
import { UpdateMarketDto } from 'src/api/admin/zillow-scrapper/dto/update-market.dto';
import { CreateCountyDto } from 'src/api/admin/zillow-scrapper/dto/create-county.dto';
import { ListCountiesDto } from 'src/api/admin/zillow-scrapper/dto/list-counties.dto';
import { County } from 'src/api/entities/county.entity';
import { ListSnapshotsDto } from 'src/api/admin/zillow-scrapper/dto/list-snapshots.dto';
import { ZillowScrapperSnapshot } from 'src/api/entities/zillow-scrapper-snapshot.entity';
import { ListMarketSnapshotsDto } from 'src/api/admin/zillow-scrapper/dto/list-market-snapshots.dto';
import { UpdateCountyDto } from 'src/api/admin/zillow-scrapper/dto/update-county.dto';


@Injectable()
export class OnMarketService {

  constructor(
    private readonly marketRepository: MarketRepository,
    private readonly propertyListingRepository: PropertyListingRepository,
    private readonly filteringRepository: FilteringRepository,
    private readonly zillowScrapperSnapshotRepository: ZillowScrapperSnapshotRepository,
    private readonly httpService: HttpService,
    private readonly countyRepository: CountyRepository,

  ) { }

  // -------------- PRIVATE FUNCTIONs -------------------  
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
    const url = 'https://api.brightdata.com/datasets/v3/trigger?dataset_id=gd_lfqkr8wm13ixtbd8f5&notify=https://uniqueproject-229b37d9b8ca.herokuapp.com/api/admin/scrapper/notification&format=json&type=discover_new&discover_by=url';

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

  private async pullData(snapshot_id) {
    // Fetch the snapshot data from BrightData API snapshot_id
    const url = `https://api.brightdata.com/datasets/v3/snapshot/${snapshot_id}?compress=true&format=json`;
    const headers = { Authorization: `Bearer ${process.env.BRIGHTDATA_API_TOKEN}` };

    try {
      const response = await firstValueFrom(
        this.httpService.request({ url, method: 'GET', headers, responseType: 'stream', timeout: 10000 })
      );
      const decompressedData = await this.decompressData(response.data);
      const jsonData = JSON.parse(decompressedData.toString());
      const snapshot = await this.zillowScrapperSnapshotRepository.findOne({ where: { brightdata_id: snapshot_id }, relations: ['market'] })



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
          propertyListingDto.market = snapshot.market


          const zpidExist = await this.propertyListingRepository.findOne({ where: { zpid }, relations: ['snapshot'] });
          if (zpidExist) {




            const snapshot = await this.zillowScrapperSnapshotRepository.findOne({ where: { brightdata_id: snapshot_id }, relations: ['duplicatesProperties'] })

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
            await this.zillowScrapperSnapshotRepository.save(snapshot)
            console.log("This zpid already exist: " + zpid)
            continue;
          }

          await this.propertyListingRepository.createProperty(propertyListingDto)
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
  // --------------- CRON FUNCTIONS ----------------------
  @Cron(CronExpression.EVERY_DAY_AT_6AM) // change this to 6AM after testing
  async cronHandler() {
    console.log('Triggering daily sendPostRequest...');
    await this.sendCronRequest()
  }

  // new method - cron request   
  private async sendCronRequest() {

    const markets = await this.marketRepository.marketsDailyActive()

    if (markets.length > 0) {

      for (const market of markets) {

        const data = market.counties.map(county => ({ url: county.zillow_url_new })).filter(item => item.url)

        if (data.length > 0) {

          const snapshot_id = await this.triggerScrape(data)

          console.log("Snapshot ID:" + snapshot_id)
          console.log("Market ID:" + market.id)
          await this.zillowScrapperSnapshotRepository.logSnapshot(snapshot_id, market.id)
        } else {
          console.log("Didnt found any urls in this market, ID:" + market.id)
        }
      }
    } else {
      console.log("No active markets found")
    }

  }


  //active
  async filterMarketList(): Promise<{
    response: any[]
  }> {
    const listMarketsDto = new ListMarketsDto()
    listMarketsDto.limit = 9999
    listMarketsDto.offset = 0

    const markets = await this.marketRepository.listMarkets(listMarketsDto)
    let response = []
    if (!markets) {
      throw new NotFoundException("Did not find any markets")
    }
    for (const market of markets.result) {
      const unfilteredCount = await this.propertyListingRepository.unfilteredMarket(market)

      response.push({
        market: market,
        unfilteredCount: unfilteredCount
      })
    }

    return { response }

  }

  //active
  async filterMarket(marketId: string, filterMarketDto: FilterMarketDto): Promise<{
    properties: PropertyListing[],
    propertiesCount: number,
    limit: number,
    offset: number,
    totalPages: number,
    currentPage: number
  }> {
    return await this.propertyListingRepository.filterMarket(marketId, filterMarketDto)
  }


  //active
  async filteringAction(propertyId: string, admin: Admin, action: FilteredStatus) {
    return this.filteringRepository.createFilteringLog(propertyId, admin, action)
  }


  //active
  async listLogs(listLogsDto: ListLogsDto): Promise<Filtering[]> {
    return this.filteringRepository.listLogs(listLogsDto)
  }


  // --------------- PUBLIC ROUTES - ENDPOINTS
  //active
  async notificationBrightdata(payload): Promise<{ message: string }> {
    if (!payload.snapshot_id) {
      throw new NotFoundException("Snapshot ID is not found.");
    }

    // Fetch snapshot and relations
    const snapshot = await this.zillowScrapperSnapshotRepository.findOne({
      where: { brightdata_id: payload.snapshot_id },
      relations: ['market'],
    });


    // Wait for 5 seconds
    await delay(5000); // 5000 milliseconds = 5 seconds

    // Only save and proceed if status is 'ready'
    if (payload.status === "ready") {
      snapshot.status = payload.status;

      const moreInfo = await this.monitorStatus(payload.snapshot_id)

      snapshot.count = Number(moreInfo.records)

      snapshot.errors = Number(moreInfo.errors)

      await this.zillowScrapperSnapshotRepository.save(snapshot);
      console.log(`Processing snapshot with BrightData ID: ${snapshot.brightdata_id}`);

      return await this.pullData(snapshot.brightdata_id)

    }

    // Log if the status is not 'ready'
    console.log("Status is not ready...");
    return { message: "Status is not ready" };
  }


  //active
  async listSnapshots(listSnapshotsDto: ListSnapshotsDto): Promise<{
    result: ZillowScrapperSnapshot[],
    totalRecords: number,
    totalPages: number,
    currentPage: number,
    limit: number,
    offset: number
  }> {
    return this.zillowScrapperSnapshotRepository.listSnapshots(listSnapshotsDto)
  }

  //active
  async runScrapperMarket(marketId: string): Promise<{
    message: string
  }> {
    const market = await this.marketRepository.findOne({ where: { id: marketId }, relations: ['counties'] })
    if (!market) {
      throw new NotFoundException("Market with provided ID does not exist.")
    }
    const counties = market.counties
    if (counties.length === 0) {
      throw new NotFoundException("No counties found for this market")
    }

    const data = counties.map(county => ({ url: county.zillow_url_new })).filter(item => item.url)
    const snapshotId = await this.triggerScrape(data)

    return await this.zillowScrapperSnapshotRepository.logSnapshot(snapshotId, marketId)

  }

  //active
  async fetchSnapshot(snapshotId: string): Promise<{
    message: string
  }> {
    const snapshot = await this.zillowScrapperSnapshotRepository.findOne({
      where: { brightdata_id: snapshotId },
    });

    if (!snapshot) {
      throw new NotFoundException("Snapshot with this ID and Market ID does not exist.");
    }

    return await this.pullData(snapshot.brightdata_id)

  }



}
