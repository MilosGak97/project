/*

  // new method
  async listMarketSnapshots(marketId: string, listMarketSnapshotsDto: ListMarketSnapshotsDto): Promise<{

    result: ZillowScrapperSnapshot[],
    totalRecords: number,
    totalPage: number,
    currentPage: number,
    limit: number,
    offset: number
  }> {
    return await this.zillowScrapperSnapshotRepository.listMarketSnapshots(marketId, listMarketSnapshotsDto)
  }


  // new method
  async createMarket(createMarketDto: CreateMarketDto): Promise<{
    message: string
  }> {
    return this.marketRepository.createMarket(createMarketDto)
  }
 
  // new method
  async getMarket(marketId: string): Promise<Market> {
    return await this.marketRepository.getMarket(marketId)
  }

  // new method
  async deleteMarket(marketId: string): Promise<{
    message: string
  }> {
    return await this.marketRepository.deleteMarket(marketId)
  }

  // new method
  async updateMarket(marketId: string, updateMarketDto: UpdateMarketDto): Promise<{
    message: string
  }> {
    return this.marketRepository.updateMarket(marketId, updateMarketDto)
  }

  // new method
  async createCounty(marketId: string, createCountyDto: CreateCountyDto): Promise<{
    message: string
  }> {
    return this.countyRepository.createCounty(marketId, createCountyDto)
  }

  // new method
  async listCounties(marketId: string, listCountiesDto: ListCountiesDto): Promise<{
    counties: County[]
  }> {
    return this.countyRepository.listCounties(marketId, listCountiesDto)
  }

  // new method
  async deleteCounty(marketId: string, countyId: string): Promise<{
    message: string
  }> {
    return await this.countyRepository.deleteCounty(marketId, countyId)
  }

  // new method
  async getCounty(marketId: string, countyId: string): Promise<County> {
    return await this.countyRepository.getCounty(marketId, countyId)
  }

  // new method
  async updateCounty(marketId: string, countyId: string, updateCountyDto: UpdateCountyDto): Promise<{
    message: string
  }> {
    return await this.countyRepository.updateCounty(marketId, countyId, updateCountyDto)
  }







*/