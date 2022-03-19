export class Show {
    constructor(
        private id: string,
        private week_day: string,
        private start_time: Number,
        private end_time: Number,
        private band_id: string
    ) { }

    getId() {
        return this.id;
    }

    getWeek_day() {
        return this.week_day;
    }

    getStart_time() {
        return this.start_time;
    }

    getEnd_time() {
        return this.end_time;
    }

    getBand_id() {
        return this.band_id;
    }

    setId(id: string) {
        this.id = id;
    }

    setWeek_day(week_day: string) {
        this.week_day = week_day;
    }

    setStart_time(genre: Number) {
        this.start_time = genre;
    }


    setEnd_time(end_time: Number) {
        this.end_time = end_time;
    }

    setband_id(band_id: string) {
        this.band_id = band_id;
    }

    static toShowModel(Show: any): Show {
        return new Show(
            Show.id,
            Show.week_day,
            Show.start_time,
            Show.end_time,
            Show.band_id
        );
    }
}

export interface ShowDTO {
   
    week_day: string,
    start_time: Number,
    end_time: Number,
    band_id: string
}
