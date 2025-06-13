export interface Need {
    id?: string;
    title: string;
    description: string;
    category: string;
    priority: 'low' | 'medium' | 'high' | 'urgent';
    location: string;
    contactPerson: string;
    contactPhone: string;
    contactEmail: string;
    quantity?: number;
    status: 'open' | 'in-progress' | 'fulfilled';
    createdBy: string;
    createdAt: Date;
}
export declare const useNeedsStore: import("pinia").StoreDefinition<"needs", Pick<{
    needs: import("vue").Ref<Need[], Need[]>;
    loading: import("vue").Ref<boolean, boolean>;
    fetchNeeds: (category?: string) => Promise<void>;
    addNeed: (need: Omit<Need, "id" | "status" | "createdAt">) => Promise<{
        success: boolean;
        id: string;
        error?: undefined;
    } | {
        success: boolean;
        error: unknown;
        id?: undefined;
    }>;
}, "loading" | "needs">, Pick<{
    needs: import("vue").Ref<Need[], Need[]>;
    loading: import("vue").Ref<boolean, boolean>;
    fetchNeeds: (category?: string) => Promise<void>;
    addNeed: (need: Omit<Need, "id" | "status" | "createdAt">) => Promise<{
        success: boolean;
        id: string;
        error?: undefined;
    } | {
        success: boolean;
        error: unknown;
        id?: undefined;
    }>;
}, never>, Pick<{
    needs: import("vue").Ref<Need[], Need[]>;
    loading: import("vue").Ref<boolean, boolean>;
    fetchNeeds: (category?: string) => Promise<void>;
    addNeed: (need: Omit<Need, "id" | "status" | "createdAt">) => Promise<{
        success: boolean;
        id: string;
        error?: undefined;
    } | {
        success: boolean;
        error: unknown;
        id?: undefined;
    }>;
}, "fetchNeeds" | "addNeed">>;
