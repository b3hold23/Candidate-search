// TODO: Create an interface for the Candidate objects returned by the API
export default interface CandidateProfile {
  avatar: string | undefined;
    login: string;
  location?: string;
  email?: string;
  company?: string;
  bio?: string;
  avatar_url?: string;
  html_url?: string;
}