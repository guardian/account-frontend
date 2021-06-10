import { css } from "@emotion/core";
import { Button } from "@guardian/src-button";
import { brand, neutral, space } from "@guardian/src-foundations";
import React, {
  //   createContext,
  PropsWithChildren,
  //   useContext,
  useEffect,
  useRef
  //   useState,
} from "react";
import { sans } from "../styles/fonts";

// const ShouldStartLiveChatContext = createContext<
//   (shouldStartChat: boolean) => void
// >(() => {
//   // TODO: add a sentry error
//   console.error("ShouldStartLiveChatContext provider not present");
// });

const initESW = (
  gslbBaseUrl: string | null,
  liveChatAPI: any,
  targetElement: HTMLElement
) => {
  // tslint:disable-next-line:no-object-mutation
  liveChatAPI.settings.displayHelpButton = false; // Or false
  // tslint:disable-next-line:no-object-mutation
  liveChatAPI.settings.language = ""; // For example, enter 'en' or 'en-US'
  // tslint:disable-next-line:no-object-mutation
  liveChatAPI.settings.defaultMinimizedText = "Live chat"; // (Defaults to Chat with an Expert)
  // tslint:disable-next-line:no-object-mutation
  liveChatAPI.settings.disabledMinimizedText = "Live chat"; // (Defaults to Agent Offline)

  // liveChatAPI.settings.loadingText = ''; //(Defaults to Loading)
  // liveChatAPI.settings.storageDomain = 'yourdomain.com'; //(Sets the domain for your deployment so that visitors can navigate subdomains during a chat session)

  // Settings for Chat
  // liveChatAPI.settings.directToButtonRouting = function(prechatFormData) {
  // Dynamically changes the button ID based on what the visitor enters in the pre-chat form.
  // Returns a valid button ID.
  // };
  // liveChatAPI.settings.prepopulatedPrechatFields = {}; //Sets the auto-population of pre-chat form fields
  // liveChatAPI.settings.fallbackRouting = []; //An array of button IDs, user IDs, or userId_buttonId
  // liveChatAPI.settings.offlineSupportMinimizedText = '...'; //(Defaults to Contact Us)
  // tslint:disable-next-line:no-object-mutation
  liveChatAPI.settings.enabledFeatures = ["LiveAgent"];
  // tslint:disable-next-line:no-object-mutation
  liveChatAPI.settings.entryFeature = "LiveAgent";

  // [PLACEHOLDER] Chat images
  // tslint:disable-next-line:no-object-mutation
  liveChatAPI.settings.avatarImgURL =
    "https://avatars.githubusercontent.com/u/164318?s=200&v=4"; // recommended size 40x40 pixels
  // tslint:disable-next-line:no-object-mutation
  liveChatAPI.settings.smallCompanyLogoImgURL =
    "https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/75184/speech-balloon-clipart-xl.png"; // recommended size 36x36 pixels
  // tslint:disable-next-line:no-object-mutation
  liveChatAPI.settings.prechatBackgroundImgURL =
    "https://contilnetnoticias.com.br/wp-content/uploads/2020/06/320x100.png"; // recommended size 320x100 pixels

  // Target DOM Element
  // tslint:disable-next-line:no-object-mutation
  liveChatAPI.settings.targetElement = targetElement;

  // Initialise live chat API in production
  //   liveChatAPI.init(
  //     "https://gnmtouchpoint.my.salesforce.com",
  //     "https://guardiansurveys.secure.force.com",
  //     gslbBaseUrl,
  //     "00D20000000nq5g",
  //     "Chat_Team",
  //     {
  //       baseLiveAgentContentURL:
  //         "https://c.la2-c2-cdg.salesforceliveagent.com/content",
  //       deploymentId: "5725I0000004RYv",
  //       buttonId: "5735I0000004Rj7",
  //       baseLiveAgentURL: "https://d.la2-c2-cdg.salesforceliveagent.com/chat",
  //       eswLiveAgentDevName:
  //         "EmbeddedServiceLiveAgent_Parent04I5I0000004LLTUA2_1797a9534a2",
  //       isOfflineSupportEnabled: false,
  //       myCustomClassname: "greenChat",
  //     }
  //   );

  // Initialise live chat API for test environment
  liveChatAPI.init(
    "https://gnmtouchpoint--dev1.my.salesforce.com",
    "https://dev1-guardiansurveys.cs88.force.com",
    gslbBaseUrl,
    "00D9E0000004jvh",
    "Chat_Team",
    {
      baseLiveAgentContentURL:
        "https://c.la2-c1cs-fra.salesforceliveagent.com/content",
      deploymentId: "5729E000000CbOY",
      buttonId: "5739E0000008QCo",
      baseLiveAgentURL: "https://d.la2-c1cs-fra.salesforceliveagent.com/chat",
      eswLiveAgentDevName:
        "EmbeddedServiceLiveAgent_Parent04I9E0000008OxDUAU_1797a576c18",
      isOfflineSupportEnabled: false
    }
  );
};

const initLiveChat = (targetElement: HTMLElement) => {
  if (!window.embedded_svc) {
    // adding the custom styles directly to the body to ensure they win over the default styles loaded by the salesforce script
    // unfortunately the salesforce script doesn't provide a way to specify the ID of the element, so this is used to override styles
    // const customStyleElement = document.createElement("style");
    // customStyleElement.innerText = customLiveChatCSS;
    // document.body.appendChild(customStyleElement);

    const s = document.createElement("script");
    s.setAttribute(
      "src",
      "https://gnmtouchpoint.my.salesforce.com/embeddedservice/5.0/esw.min.js"
    );
    // tslint:disable-next-line:no-object-mutation
    s.onload = () => {
      initESW(null, window.embedded_svc, targetElement);
    };
    document.body.appendChild(s);
  } else {
    initESW("https://service.force.com", window.embedded_svc, targetElement);
  }
};

const withLiveChatContainerCss = css`
  /* Minimised chat button */
  .embeddedServiceHelpButton .helpButton .uiButton {
    background-color: ${brand[400]};
    font-family: ${sans};
  }

  @media only screen and (min-width: 48em) {
    .embeddedServiceHelpButton .helpButton .uiButton,
    .embeddedServiceSidebarMinimizedDefaultUI {
      border-radius: 23px;
    }
  }

  .embeddedServiceHelpButton .helpButton .uiButton:focus {
    outline: 1px solid ${brand[400]};
  }

  .embeddedServiceHelpButton .helpButton,
  .embeddedServiceSidebarMinimizedDefaultUI {
    bottom: ${space[3]}px;
    border-radius: 23px;
  }

  .embeddedServiceHelpButton .embeddedServiceIcon::before {
    /* content: url(""); */
  }

  .embeddedServiceSidebarMinimizedDefaultUI .minimizedText > .message {
    visibility: hidden;
    text-indent: -9999px;
    line-height: 0;
    text-decoration: none;
  }

  .embeddedServiceSidebarMinimizedDefaultUI .minimizedText > .message::before {
    visibility: visible;
    content: "Live Chat";
    text-indent: 0;
    display: block;
    line-height: initial;
  }

  /* Waiting to chat */
  .embeddedServiceLiveAgentStateWaiting .waitingStateContent {
    text-align: initial;
    justify-content: flex-start;
  }

  .embeddedServiceLiveAgentStateWaiting .waitingMessage {
    padding: 0;
  }

  .embeddedServiceLiveAgentStateWaiting .waitingGreetingContent {
    color: ${neutral[46]};
    margin: ${space[5]}px 0;
  }

  .embeddedServiceLiveAgentStateWaiting .embeddedServiceLoadingBalls {
    align-self: flex-start;
  }

  .embeddedServiceLiveAgentStateWaiting .embeddedServiceLoadingBalls {
    padding-top: 0;
  }

  .embeddedServiceLiveAgentStateWaiting .loadingBall {
    background-color: #c4c4c4;
  }

  .embeddedServiceSidebarButton {
    background: ${brand[400]};
    border: 1px solid ${neutral[46]};
  }

  /* Chat header */
  h2[embeddedService-chatHeader_chatHeader] {
    visibility: hidden;
  }

  h2[embeddedService-chatHeader_chatHeader]::before {
    content: "Live Chat";
    visibility: visible;
    font-weight: bold;
    font-family: ${sans};
  }

  /* Chat body */
  .embeddedServiceSidebar .sidebarBody {
    font-family: ${sans};
  }

  /* Chat messages */
  .embeddedServiceLiveAgentStateChatPlaintextMessageDefaultUI.agent.plaintextContent {
    background: #ededed;
  }

  .embeddedServiceLiveAgentStateChatPlaintextMessageDefaultUI.chasitor.plaintextContent {
    background: #052962;
  }
`;

export const WithLiveChatContainer = ({ children }: PropsWithChildren<{}>) => {
  const liveChatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const queryString = window.location.search.slice(1);

    const liveChatRegex = /liveChat.+?(?=\&|$)/g;
    const match = queryString.match(liveChatRegex);

    if (match) {
      const liveChatKeyValueArray = match[0].split("=");
      window.sessionStorage.setItem(
        liveChatKeyValueArray[0],
        liveChatKeyValueArray[1]
      );
    }

    if (
      window.sessionStorage.getItem("liveChat") === "1" &&
      //   shouldStartChat &&
      liveChatContainerRef.current
    ) {
      initLiveChat(liveChatContainerRef.current);
    }
  }, []);

  return (
    //  <ShouldStartLiveChatContext.Provider value={setShouldStartChat}>
    <>
      {children}
      <div ref={liveChatContainerRef} css={withLiveChatContainerCss} />
    </>
    //  </ShouldStartLiveChatContext.Provider>
  );
};

export const StartLiveChatButton = () => {
  function bootstrapChat(): void {
    window.embedded_svc.bootstrapEmbeddedService();
  }

  //   const setShouldStartChat = useContext(ShouldStartLiveChatContext);
  return (
    <Button priority="secondary" onClick={() => bootstrapChat()}>
      Start live chat
    </Button>
  );
};
