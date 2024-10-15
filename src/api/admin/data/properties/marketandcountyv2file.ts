
/*

    SEE IF ANYTHING OF THIS CAN BE USED

    // new endpoint
    @Post('markets')
    @ApiOperation({ summary: "Create market" })
    async createMarket(@Body() CreateMarketDto: CreateMarketDto): Promise<{
        message: string
    }> {
        return this.onMarketService.createMarket(CreateMarketDto)
    }

    // new endpoint
   
    @Get('markets')
    @ApiOperation({ summary: "Get list of markets " })
    async listMarkets(@Query() listMarketsDto: ListMarketsDto): Promise<{

        limit: number,
        offset: number,
        totalRecords: number,
        totalPages: number,
        currentPage: number,
        result: Market[]

    }> {
        return await this.onMarketService.listMarkets(listMarketsDto)
    }

    @Get('markets/:id')
    @ApiOperation({ summary: "Get single market per id" })
    async getMarket(@Param('id') marketId: string): Promise<Market> {
        return await this.onMarketService.getMarket(marketId)
    }

    // new endpoint
    @Delete('markets/:id')
    @ApiOperation({ summary: "Delete market by id" })
    async deleteMarket(@Param('id') marketId: string): Promise<{
        message: string
    }> {
        return await this.onMarketService.deleteMarket(marketId)
    }

    // new endpoint
    @Patch('markets/:id')
    @ApiOperation({ summary: "Update market by id" })
    async updateMarket(@Param('id') marketId: string, @Query() updateMarketDto: UpdateMarketDto) {
        return await this.onMarketService.updateMarket(marketId, updateMarketDto)
    }
    // new endpoint
    @Post('markets/:id/counties')
    @ApiOperation({ summary: "Create county and assign it to market" })
    async createCounty(@Param('id') marketId: string, @Body() createCountyDto: CreateCountyDto): Promise<{
        message: string
    }> {
        return await this.onMarketService.createCounty(marketId, createCountyDto)
    }

    // new endpoint
    @Get('markets/:id/counties')
    @ApiOperation({ summary: "List all counties withing provided market" })
    async listCounties(@Param('id') marketId: string, @Query() listCountiesDto: ListCountiesDto): Promise<{
        counties: County[]
    }> {
        return await this.onMarketService.listCounties(marketId, listCountiesDto)
    }
    // new endpoint
    @Delete('markets/:marketId/counties/:countyId')
    @ApiOperation({ summary: "Delete county " })
    async deleteCounty(@Param('marketId') marketId: string, @Param('countyId') countyId: string):Promise<{
        message:string
    }> {
        return await this.onMarketService.deleteCounty(marketId, countyId)
    }

    @Get('markets/:id/counties/:countyId')
    @ApiOperation({ summary: "Show county per id" })
    async getCounty(@Param('id') marketId: string, @Param('countyId') countyId: string): Promise<County> {
        return await this.onMarketService.getCounty(marketId, countyId)
    }

    @Patch('markets/:id/counties/:countyId')
    @ApiOperation({ summary: "Update county per id" })
    async updateCounty(@Param('id') marketId: string, @Param('countyId') countyId: string, @Query() updateCountyDto: UpdateCountyDto): Promise<{
        message: string
    }> {
        return await this.onMarketService.updateCounty(marketId, countyId, updateCountyDto)
    }

*/