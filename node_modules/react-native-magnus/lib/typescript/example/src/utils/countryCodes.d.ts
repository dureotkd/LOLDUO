export interface CountryCodeType {
    country: {
        name: string;
        isoCode: string;
    };
    dialCode: number;
}
export declare const countryCodes: CountryCodeType[];
