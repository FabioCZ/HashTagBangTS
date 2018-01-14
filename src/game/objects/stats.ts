
export class Stats {
    private _distanceTo:number;
    private _rangeFrom:number;
    private _gunRange:number;
    private _hasBarrel:boolean;
    private _inPrison:boolean;
    private _hasDynamite:boolean;
    private _isVolcanic:boolean;

    constructor(builder:StatsBuilder)
    {
        this._distanceTo = builder.distanceTo;
        this._rangeFrom = builder.rangeFrom;
        this._gunRange = builder.gunRange;
        this._hasBarrel = builder.hasBarrel;
        this._inPrison = builder.inPrison;
        this._hasDynamite = builder.hasDynamite;
        this._isVolcanic = builder.hasVolcanic;
    }

    get distanceTo(): number{
        return this._distanceTo;
    }

    get rangeFrom(): number{
        return this._distanceTo;
    }

    get gunRange(): number{
        return this._gunRange;
    }

    get hasBarrel(): boolean{
        return this._hasBarrel;
    }

    get inPrison(): boolean{
        return this._inPrison;
    }

    get hasDynamite(): boolean{
        return this._hasDynamite;
    }

    get isVolcanic(): boolean{
        return this._isVolcanic;
    }
}

export class StatsBuilder{

   private _distanceTo = 0;
   private _rangeFrom = 0;
   private _gunRange = 0;
   private _hasBarrel = false;
   private _inPrison = false;
   private _hasDynamite = false;
   private _hasVolcanic = false;


    static builder(): StatsBuilder{
        return new StatsBuilder();
    }

    public build(): Stats{
        return new Stats(this);
    }

    public modifyDistanceTo(newDistance:number): StatsBuilder{
        this._distanceTo = newDistance;
        return this;
    }

    public modifyRangeFrom(newRangeFrom:number): StatsBuilder{
        this._rangeFrom = newRangeFrom;
        return this;
    }

    public modifyGunRange(newGunRange:number): StatsBuilder{
        this._gunRange = newGunRange;
        return this;
    }

    public isBarrel(): StatsBuilder{
        this._hasBarrel = true;
        return this;
    }

    public isPrison(): StatsBuilder{
        this._inPrison = true;
        return this;
    }

    public isDynamite(): StatsBuilder{
        this._hasDynamite = true;
        return this;
    }

    public isVolcanic(): StatsBuilder{
        this._hasVolcanic = true;
        return this;
    }

    get distanceTo(): number{
        return this._distanceTo;
    }

    get rangeFrom(): number{
        return this._distanceTo;
    }

    get gunRange(): number{
        return this._gunRange;
    }

    get hasBarrel(): boolean{
        return this._hasBarrel;
    }

    get inPrison(): boolean{
        return this._inPrison;
    }

    get hasDynamite(): boolean{
        return this._hasDynamite;
    }

    get hasVolcanic(): boolean{
        return this._hasVolcanic;
    }
}