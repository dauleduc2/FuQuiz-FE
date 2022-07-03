export interface Setting {
    id: string;
    type: SettingType;
    value: string;
    order: number;
    isActivate: boolean;
}

export interface SettingType {
    id: string;
    name: string;
}

export enum SettingEnum {
    ROLE = 'Role',
    SYSTEM_MENU = 'System Menu',
    POST_CATEGORIES = 'Post Categories',
    SUBJECT_CATEGORIES = 'Subject Categories',
    TEST_TYPES = 'Test Types',
    QUESTION_LEVELS = 'Question Levels',
    LESSON_TYPES = 'Lesson Types',
    SUBJECT_DIMENSION = 'Subject Dimension',
    DIMENSION_TYPES = 'Dimension Types',
}
