import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface ContactInfo {
    email: string;
    address: string;
    phone: string;
}
export interface Client {
    logo?: ExternalBlob;
    name: string;
    description: string;
}
export interface ProjectUpdate {
    title: string;
    description: string;
    images: Array<ExternalBlob>;
}
export interface Service {
    name: string;
    description: string;
}
export interface WebsiteContent {
    contact: ContactInfo;
    heroSubheadline: string;
    materials: string;
    heroHeadline: string;
    services: Array<Service>;
    companyDescription: string;
    clients: Array<Client>;
}
export interface Project {
    id: bigint;
    title: string;
    description: string;
    images: Array<ExternalBlob>;
}
export interface UserProfile {
    name: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addProject(projectInfo: ProjectUpdate): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteProject(projectId: bigint): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getContent(): Promise<WebsiteContent>;
    getProjects(): Promise<Array<Project>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    updateContent(newContent: WebsiteContent): Promise<void>;
    updateProject(projectId: bigint, updatedInfo: ProjectUpdate): Promise<void>;
}
