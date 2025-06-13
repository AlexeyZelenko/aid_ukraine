import { User } from 'firebase/auth';
export declare const useAuthStore: import("pinia").StoreDefinition<"auth", Pick<{
    user: import("vue").Ref<User | null, User | null>;
    loading: import("vue").Ref<boolean, boolean>;
    init: () => void;
    login: (email: string, password: string) => Promise<{
        success: boolean;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
    }>;
    register: (email: string, password: string) => Promise<{
        success: boolean;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
    }>;
    signOut: () => Promise<{
        success: boolean;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
    }>;
}, "user" | "loading">, Pick<{
    user: import("vue").Ref<User | null, User | null>;
    loading: import("vue").Ref<boolean, boolean>;
    init: () => void;
    login: (email: string, password: string) => Promise<{
        success: boolean;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
    }>;
    register: (email: string, password: string) => Promise<{
        success: boolean;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
    }>;
    signOut: () => Promise<{
        success: boolean;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
    }>;
}, never>, Pick<{
    user: import("vue").Ref<User | null, User | null>;
    loading: import("vue").Ref<boolean, boolean>;
    init: () => void;
    login: (email: string, password: string) => Promise<{
        success: boolean;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
    }>;
    register: (email: string, password: string) => Promise<{
        success: boolean;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
    }>;
    signOut: () => Promise<{
        success: boolean;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
    }>;
}, "init" | "login" | "register" | "signOut">>;
