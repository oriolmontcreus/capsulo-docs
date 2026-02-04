export interface HeroSchemaData {
    title: string;
    subtitle: string;
    email_test: string;
    test_rich: string;
    ctaButton: string;
    ctaLinkType: 'internal' | 'external';
    ctaInternalLink: string;
    ctaExternalLink: string;
    exampleInput: string;
    exampleTextarea: string;
    exampleSelect: string;
    exampleSwitch: boolean;
    exampleRichEditor: string;
    exampleFileUpload: any;
    exampleColorPicker: string;
    exampleDateField: string;
    gridInputLeft: string;
    gridInputRight: string;
    exampleRepeater: { repeaterItem: string }[];
    subtitle_test: string;
    cards: {
        title: string;
        description: string;
        email_test2: string;
    }[];
}
