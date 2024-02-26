interface Condition {
    attribute: string;
    operator: string;
    value: string | number | boolean | string[] | Date;
}

interface NestedCondition {
    and?: Condition[];
    or?: Condition[];
    not?: Condition[];
}

interface Segment {
    archived?: boolean;
    description: string;
    conditions: (Condition | NestedCondition)[];
    name: string;
}

export type { Condition, NestedCondition, Segment };