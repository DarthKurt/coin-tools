import { NavigationData } from "./navigation-data";

interface HttpResponse {
    readonly headers: Object;
    readonly status: number;
    readonly statusText: string;
    readonly url: string;
}

interface HttpRequestParameters {
    readonly method: string;
    readonly url: string;
    readonly headers: Object;
    readonly timeout: number;
    onload: (response: HttpResponse) => void;
    onerror: () => void;
    ontimeout: () => void;
}

interface Http {
    request(parameters: HttpRequestParameters): { abort: () => void };
}

export default class Navigator {

    private _lock: boolean = false;

    constructor(private readonly _http: Http) {
    }

    public async navigateNextUrl(
        data: ArrayLike<NavigationData>,
        startIndex: number,
        pingTimeout: number): Promise<void> {

        if (!data || data.length <= 0) {
            return Promise.reject("Invalid navigation data");
        }

        if (!this._lock) {
            this._lock = true;
            window.location.href = await this.resolveNextUrl(data, startIndex, pingTimeout);
        }
    }

    private async resolveNextUrl(
        data: ArrayLike<NavigationData>,
        startIndex: number,
        pingTimeout: number) {

        let nextIndex = startIndex;
        while (true) {
            nextIndex = nextIndex + 1;
            if (nextIndex >= data.length) {
                nextIndex = 0;
            }

            const dataEntry = data[nextIndex];

            if(!dataEntry) {
                return Promise.reject("Invalid navigation data entry");
            }

            const nextUrl = dataEntry.url;
            const succeeded = await this.pingUrl(nextUrl);

            if (succeeded) {
                return nextUrl;
            }

            await this.delay(pingTimeout);
        }
    }

    private delay(timeout: number): Promise<void> {
        return new Promise(f => setTimeout(f, timeout));
    }

    private async pingUrl(websiteUrl: string): Promise<boolean> {
        let isNextUrlReachable = false;
        console.log(`Ping: ${websiteUrl}`);
        const task = this._http.request({
            method: "GET",
            url: websiteUrl,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            timeout: 5000,
            onload: (response) => {
                if (response && response.status == 200) {
                    console.log(`URL ${websiteUrl} ping success.`);
                    isNextUrlReachable = true;
                } else {
                    console.log(`URL ${websiteUrl} ping failed.`);
                }
            },
            onerror: () => {
                console.log(`URL ${websiteUrl} ping failed.`);
            },
            ontimeout: () => {
                console.log(`URL ${websiteUrl} ping timeout.`);
            },
        });

        await this.delay(5000);

        task.abort();

        return isNextUrlReachable;
    }
}