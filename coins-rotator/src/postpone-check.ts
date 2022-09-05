import { DateTime, Duration } from "luxon";

interface PostponeDbProxy {
    getDate(url: string, wallet: string): number | null;
    setDate(url: string, wallet: string, date: number): void;
    removeDate(url: string, wallet: string): void;
}

enum PostponeReason {
    Regular,
    BlockOrLimit,
    Funds,
    Success,
}

export default class PostponeCheck {

    constructor(private readonly _db: PostponeDbProxy) {
    }

    public isWalletPostponed(url: string, wallet: string): boolean {
        const seconds = this._db.getDate(url, wallet);

        if (!seconds) {
            // No records
            return false;
        }

        const dt = DateTime.fromSeconds(seconds);
        return DateTime.now() < dt;
    }

    public postponeNextCheck(url: string, wallet: string, reason: PostponeReason): void {
        switch (reason) {
            case PostponeReason.BlockOrLimit:
                this.postponeNextCheckForPeriod(url, wallet, Duration.fromObject({
                    days: 1
                }));
                break;
            case PostponeReason.Funds:
                this.postponeNextCheckForPeriod(url, wallet, Duration.fromObject({
                    hours: 6
                }));
                break;
            case PostponeReason.Success:
                this._db.removeDate(url, wallet);
                break;
            default:
                this.postponeNextCheckForPeriod(url, wallet, Duration.fromObject({
                    minutes: 15
                }));
                break;
        }
    }

    private postponeNextCheckForPeriod(url: string, wallet: string, dt: Duration): void {
        const newDate = DateTime.now().plus(dt).toSeconds();
        this._db.setDate(url, wallet, newDate);
    }
}
