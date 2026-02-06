import List "mo:core/List";
import Map "mo:core/Map";
import Text "mo:core/Text";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Storage "blob-storage/Storage";
import MixinStorage "blob-storage/Mixin";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";

actor {
  // Include blob storage mixin
  include MixinStorage();

  // Access Control
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User Profile Type
  public type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  // User Profile Management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Website Content Types
  type Service = {
    name : Text;
    description : Text;
  };

  type Client = {
    name : Text;
    description : Text;
    logo : ?Storage.ExternalBlob;
  };

  type Project = {
    id : Nat;
    title : Text;
    description : Text;
    images : [Storage.ExternalBlob];
  };

  type ContactInfo = {
    email : Text;
    phone : Text;
    address : Text;
  };

  type WebsiteContent = {
    heroHeadline : Text;
    heroSubheadline : Text;
    companyDescription : Text;
    services : [Service];
    materials : Text;
    clients : [Client];
    contact : ContactInfo;
  };

  type ProjectUpdate = {
    title : Text;
    description : Text;
    images : [Storage.ExternalBlob];
  };

  // Persistent State
  var nextProjectId = 1; // Mutable for ID generation

  // Helper data structures for managing projects
  let projects = Map.empty<Nat, Project>();

  var content : WebsiteContent = {
    heroHeadline = "Welcome to SCS Services";
    heroSubheadline = "Your Large-Scale Fabrication Experts";
    companyDescription = "We specialize in fabrication for trade shows, events, and film sets. Based in Berlin, we've undertaken projects throughout Europe.";
    services = [];
    materials = "We work with a variety of materials including wood, metals, plastics, and more.";
    clients = [];
    contact = {
      email = "info@scsservices.com";
      phone = "+49 123 456789";
      address = "Berlin, Germany";
    };
  };

  // Content CRUD (Admin-only)
  public shared ({ caller }) func updateContent(newContent : WebsiteContent) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update content");
    };
    content := newContent;
  };

  // Admin Project Management
  public shared ({ caller }) func addProject(projectInfo : ProjectUpdate) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can add projects");
    };
    let project : Project = {
      id = nextProjectId;
      title = projectInfo.title;
      description = projectInfo.description;
      images = projectInfo.images;
    };
    projects.add(nextProjectId, project);
    nextProjectId += 1;
  };

  public shared ({ caller }) func updateProject(projectId : Nat, updatedInfo : ProjectUpdate) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update projects");
    };
    switch (projects.get(projectId)) {
      case (null) { Runtime.trap("Project does not exist") };
      case (?_) {
        let updatedProject : Project = {
          id = projectId;
          title = updatedInfo.title;
          description = updatedInfo.description;
          images = updatedInfo.images;
        };
        projects.add(projectId, updatedProject);
      };
    };
  };

  public shared ({ caller }) func deleteProject(projectId : Nat) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can delete projects");
    };
    switch (projects.get(projectId)) {
      case (null) { Runtime.trap("Project does not exist") };
      case (?_) {
        projects.remove(projectId);
      };
    };
  };

  // Public Methods (No Auth Required - accessible to all including guests)
  public query ({ caller }) func getContent() : async WebsiteContent {
    content;
  };

  public query ({ caller }) func getProjects() : async [Project] {
    projects.values().toArray();
  };
};
