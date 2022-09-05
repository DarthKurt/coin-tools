
interface MessagesMap {
    [i: number]: Array<string>;
}

export default class Utils {

    public static includesOneOf(srcString: String, arrayOfStrings: string[]): boolean {
        const normalizeSrc = srcString.toLowerCase();
        return Utils._includesOneOf(normalizeSrc, arrayOfStrings);
    }

    private static _includesOneOf(srcString: String, arrayOfStrings: string[]): boolean {
        for (const s of arrayOfStrings) {
            if (srcString.includes(s.toLowerCase())) {
                return true;
            }
        }

        return false;
    }

    public static getCategory(srcString: String, messages: MessagesMap): number | undefined {
        const normalizeSrc = srcString.toLowerCase();

        for (const k of Object.keys(messages).map(key => parseInt(key))) {
            if(Utils._includesOneOf(normalizeSrc, messages[k])){
                return k;
            }
        }

        return undefined;
    }

    // TODO: typeguard
    public static submitOrClick(predicate: boolean, element: HTMLElement | HTMLFormElement): void {
        if (predicate) {
            const form = element as HTMLFormElement;
            form.submit();
        } else {
            element.click();
        }
    }
}
