import { ConsentOption, ConsentOptionType } from "../models";
import { APIPatchOptions, APIUseCredentials, identityFetch } from "./fetch";

interface NewsletterAPIResponse {
  id: string;
  theme: string;
  name: string;
  description: string;
  frequency: string;
  subscribed: boolean;
  exactTargetListId: number;
}

const newsletterToConsentOption = (
  newsletter: NewsletterAPIResponse
): ConsentOption => {
  const { theme, name, description, frequency, exactTargetListId } = newsletter;
  return {
    id: exactTargetListId.toString(),
    description,
    theme,
    type: ConsentOptionType.NEWSLETTER,
    name,
    frequency,
    subscribed: false
  };
};

export const read = async (): Promise<ConsentOption[]> => {
  const url = "/newsletters";
  return ((await identityFetch(url)) as NewsletterAPIResponse[]).map(
    newsletterToConsentOption
  );
};

export const update = async (id: string, subscribed: boolean = true) => {
  const url = "/users/me/newsletters";
  const payload = {
    id,
    subscribed
  };
  identityFetch(url, APIUseCredentials(APIPatchOptions(payload)));
};
