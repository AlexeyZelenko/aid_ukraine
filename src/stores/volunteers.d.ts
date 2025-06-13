export interface Volunteer {
    id?: string;
    name: string;
    email: string;
    phone: string;
    organization: string;
    type: 'volunteer' | 'fund' | 'rehabilitation';
    description: string;
    location: string;
    verified: boolean;
    createdAt: Date;
}
export declare const useVolunteersStore: import("pinia").StoreDefinition<"volunteers", Pick<{
    volunteers: import("vue").Ref<Volunteer[], Volunteer[]>;
    loading: import("vue").Ref<boolean, boolean>;
    fetchVolunteers: () => Promise<void>;
    addVolunteer: (volunteer: Omit<Volunteer, "id" | "verified" | "createdAt">) => Promise<{
        success: boolean;
        id: string;
        error?: undefined;
    } | {
        success: boolean;
        error: unknown;
        id?: undefined;
    }>;
}, "loading" | "volunteers">, Pick<{
    volunteers: import("vue").Ref<Volunteer[], Volunteer[]>;
    loading: import("vue").Ref<boolean, boolean>;
    fetchVolunteers: () => Promise<void>;
    addVolunteer: (volunteer: Omit<Volunteer, "id" | "verified" | "createdAt">) => Promise<{
        success: boolean;
        id: string;
        error?: undefined;
    } | {
        success: boolean;
        error: unknown;
        id?: undefined;
    }>;
}, never>, Pick<{
    volunteers: import("vue").Ref<Volunteer[], Volunteer[]>;
    loading: import("vue").Ref<boolean, boolean>;
    fetchVolunteers: () => Promise<void>;
    addVolunteer: (volunteer: Omit<Volunteer, "id" | "verified" | "createdAt">) => Promise<{
        success: boolean;
        id: string;
        error?: undefined;
    } | {
        success: boolean;
        error: unknown;
        id?: undefined;
    }>;
}, "fetchVolunteers" | "addVolunteer">>;
