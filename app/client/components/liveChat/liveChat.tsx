import { css } from "@emotion/core";
import { Button } from "@guardian/src-button";
import { brand, neutral, space } from "@guardian/src-foundations";
import React, { PropsWithChildren, useEffect, useRef } from "react";
import { sans } from "../../styles/fonts";
import {
  avatarImg,
  chatHeaderIcon,
  minimisedChatSpeechBubble,
  prechatBackgroundImg
} from "./liveChatBase64Images";

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
  liveChatAPI.settings.avatarImgURL = avatarImg; // recommended size 40x40 pixels
  // tslint:disable-next-line:no-object-mutation
  liveChatAPI.settings.prechatBackgroundImgURL = prechatBackgroundImg; // recommended size 320x100 pixels
  // liveChatAPI.settings.smallCompanyLogoImgURL = ""; // recommended size 36x36 pixels

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

  // Initialise live chat API for DEV1 test sandbox
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
  /* Container */
  .embeddedServiceSidebar.layout-docked .dockableContainer {
    border-radius: 0;
  }

  /* Minimised chat button */
  .embeddedServiceHelpButton .helpButton .uiButton {
    background-color: ${brand[400]};
    font-family: ${sans};
  }

  @media only screen and (min-width: 48em) {
    .embeddedServiceHelpButton .helpButton .uiButton,
    .embeddedServiceSidebarMinimizedDefaultUI {
      border-radius: 0;
    }
  }

  .embeddedServiceHelpButton .helpButton .uiButton:focus {
    outline: 1px solid ${brand[400]};
  }

  .embeddedServiceSidebarMinimizedDefaultUI {
    box-shadow: none;
  }

  .embeddedServiceSidebarMinimizedDefaultUI,
  .embeddedServiceSidebarMinimizedDefaultUI:hover,
  .embeddedServiceSidebarMinimizedDefaultUI:focus,
  .embeddedServiceSidebarMinimizedDefaultUI.minimizedContainer,
  .embeddedServiceSidebarMinimizedDefaultUI.minimizedContainer:hover,
  .embeddedServiceSidebarMinimizedDefaultUI.minimizedContainer:focus {
    bottom: ${space[3]}px;
    border-radius: 0;
    background: ${neutral[100]};
    border: 2px solid ${brand[400]};
  }

  .embeddedServiceSidebarMinimizedDefaultUI .content {
    color: ${brand[400]};
  }

  .embeddedServiceSidebarMinimizedDefaultUI .embeddedServiceIcon {
    display: none;
  }

  .embeddedServiceSidebarMinimizedDefaultUI .minimizedText > .message {
    margin-bottom: ${space[1]}px;
    overflow: visible;
  }

  .embeddedServiceSidebarMinimizedDefaultUI .minimizedText > .message::before {
    content: url(${minimisedChatSpeechBubble});
    position: relative;
    top: 6px;
    margin-right: ${space[1]}px;
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

  .embeddedServiceLiveAgentStateWaiting .waitingGreeting {
    font-size: 17px;
  }

  .embeddedServiceLiveAgentStateWaiting .embeddedServiceLoadingBalls {
    padding-top: 0;
    align-self: flex-start;
  }

  .embeddedServiceLiveAgentStateWaiting .loadingBall,
  .embeddedServiceLoadingBalls.tiny .loadingBall {
    background-color: #c4c4c4;
  }

  .embeddedServiceSidebarButton {
    background: ${brand[400]};
    border: 1px solid ${neutral[46]};
  }

  /* Chat header */
  h2[embeddedService-chatHeader_chatHeader] {
    overflow: visible;
  }

  h2[embeddedService-chatHeader_chatHeader]::before {
    content: url(${chatHeaderIcon});
    position: relative;
    top: ${space[2]}px;
    margin-right: ${space[2]}px;
  }

  /* Chat body */
  .embeddedServiceSidebar .sidebarBody {
    font-family: ${sans};
  }

  .embeddedServiceSidebarButton:focus {
    text-decoration: none;
  }

  /* Chat messages */
  .embeddedServiceLiveAgentStateChatPlaintextMessageDefaultUI.agent.plaintextContent {
    background: #ededed;
  }

  .embeddedServiceLiveAgentStateChatPlaintextMessageDefaultUI.chasitor.plaintextContent {
    background: ${brand[400]};
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
      liveChatContainerRef.current
    ) {
      initLiveChat(liveChatContainerRef.current);
    }
  }, []);

  return (
    <>
      {children}
      <div ref={liveChatContainerRef} css={withLiveChatContainerCss} />
    </>
  );
};

export const StartLiveChatButton = () => {
  function bootstrapChat(): void {
    window.embedded_svc.bootstrapEmbeddedService();
  }

  return (
    <Button priority="secondary" onClick={() => bootstrapChat()}>
      Start live chat
    </Button>
  );
};
