export default class Utils {

    public static includesOneOf(srcString: String, arrayOfStrings: string | string[]):boolean {
        const normalizeSrc = srcString.toLowerCase();
    
        if (!Array.isArray(arrayOfStrings)) {
            return normalizeSrc.includes(arrayOfStrings.toLowerCase());
        }
   
        for (const s of arrayOfStrings) {
            if (normalizeSrc.includes(s.toLowerCase())) {
                return true;
            }
        }
    
        return false;
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
