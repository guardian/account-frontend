import React from "react";

export interface DirectDebitLogoProps {
  fill?: string;
  justLogo?: true;
}

export const DirectDebitLogo = (props: DirectDebitLogoProps) =>
  props.justLogo ? (
    <svg width="25" height="18" viewBox="0 0 25 18" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.924 6.88057V16.2912C12.924 16.2912 7.5904 15.3066 7.5904 11.5661C7.5907 8.58281 11.5388 7.26779 12.924 6.88057ZM12.924 6.70501C9.7184 6.46774 2.44985 8.0049 2.44985 11.369C2.44985 13.5624 6.2987 16.7691 12.5666 16.8533C12.8139 16.8533 19.9341 16.5719 19.8243 8.75312C19.732 2.18607 14.9277 1.03581 13.3914 0.835568V0.435387C19.5161 0.8331 24.333 4.60135 24.333 9.1749C24.333 14.0126 18.9446 17.9499 12.3193 17.9499C5.69402 17.9499 0.333008 14.0123 0.333008 9.1749C0.333008 4.33755 5.69372 0.399902 12.3193 0.399902C12.5223 0.399902 12.724 0.403606 12.9243 0.411011L12.924 6.70501Z"
        fill="black"
      />
    </svg>
  ) : (
    <svg height="27px" width="82px" viewBox="0 0 82 27" version="1.1">
      <g id="directdebit_logo" fill={props.fill || "black"}>
        <path d="M29.6728099,12.7469472 C29.6753768,5.15747535 25.1177007,1.86784859 19.9362676,0.707609155 L19.9362676,0.315158451 C29.3622148,0.808859155 36.2666092,6.54388732 36.2643275,13.105743 C36.2617606,20.598243 28.136662,25.9408204 18.1163345,25.9336901 C8.09572183,25.9265599 0.0182535211,20.1721373 0.0205352113,13.0803592 C0.0233873239,5.64005282 7.08151056,0.26781338 19.1102958,0.276369718 L19.1068732,9.51921127 L16.2633169,9.46102817 C10.1700634,9.67151408 3.11308099,12.3242641 3.11165493,15.8942535 C3.11022887,19.8210423 9.80813028,24.5461373 17.851088,24.5515563 C24.3564718,24.5561197 29.670243,19.8398662 29.6728099,12.7469472" />
        <path
          d="M29.6728099,12.7469472 C29.6753768,5.15747535 25.1177007,1.86784859 19.9362676,0.707609155 L19.9362676,0.315158451 C29.3622148,0.808859155 36.2666092,6.54388732 36.2643275,13.105743 C36.2617606,20.598243 28.136662,25.9408204 18.1163345,25.9336901 C8.09572183,25.9265599 0.0182535211,20.1721373 0.0205352113,13.0803592 C0.0233873239,5.64005282 7.08151056,0.26781338 19.1102958,0.276369718 L19.1068732,9.51921127 L16.2633169,9.46102817 C10.1700634,9.67151408 3.11308099,12.3242641 3.11165493,15.8942535 C3.11022887,19.8210423 9.80813028,24.5461373 17.851088,24.5515563 C24.3564718,24.5561197 29.670243,19.8398662 29.6728099,12.7469472 Z"
          strokeWidth="0.144"
        />
        <path d="M19.0489754,23.4897148 C15.5962077,23.2410106 11.1571796,20.9373592 11.1586056,16.9706408 C11.1600317,13.0438521 14.9427887,10.1994401 19.0538239,10.0459965 L19.0489754,23.4897148" />
        <path d="M19.0489754,23.4897148 C15.5962077,23.2410106 11.1571796,20.9373592 11.1586056,16.9706408 C11.1600317,13.0438521 14.9427887,10.1994401 19.0538239,10.0459965 L19.0489754,23.4897148 Z" />
        <path d="M72.9279507,5.6523169 L72.7468415,6.67337324 C72.2745317,6.51508099 67.7661972,5.45894366 67.7008838,8.81274296 C67.6486901,11.4982923 71.7503134,11.168588 72.6900845,10.918743 L72.7950423,12.0322077 C69.7116232,12.8929754 65.615419,11.952919 65.5324225,8.78507746 C65.4363063,5.13237676 70.8538944,4.68088732 72.9279507,5.6523169" />
        <path d="M72.9279507,5.6523169 L72.7468415,6.67337324 C72.2745317,6.51508099 67.7661972,5.45894366 67.7008838,8.81274296 C67.6486901,11.4982923 71.7503134,11.168588 72.6900845,10.918743 L72.7950423,12.0322077 C69.7116232,12.8929754 65.615419,11.952919 65.5324225,8.78507746 C65.4363063,5.13237676 70.8538944,4.68088732 72.9279507,5.6523169 Z" />
        <polyline points="76.1137606 12.2175951 76.115757 6.46545423 73.3460704 6.46317254 73.3460704 5.36539437 80.7932218 5.37052817 80.7929366 6.46859155 78.0754437 6.46659507 78.0734472 12.2190211 76.1137606 12.2175951" />
        <polygon points="76.1137606 12.2175951 76.115757 6.46545423 73.3460704 6.46317254 73.3460704 5.36539437 80.7932218 5.37052817 80.7929366 6.46859155 78.0754437 6.46659507 78.0734472 12.2190211" />
        <polyline points="59.5044824 5.30521479 64.9962254 5.30863732 64.9959401 6.45746831 61.3369648 6.45490141 61.3349683 12.1545634 59.5019155 12.1531373 59.5044824 5.30521479" />
        <polygon points="59.5044824 5.30521479 64.9962254 5.30863732 64.9959401 6.45746831 61.3369648 6.45490141 61.3349683 12.1545634 59.5019155 12.1531373 59.5044824 5.30521479" />
        <polyline points="61.1641268 8.19212324 64.7800352 8.19440493 64.7794648 9.3429507 61.1638415 9.3403838 61.1641268 8.19212324" />
        <polygon points="61.1641268 8.19212324 64.7800352 8.19440493 64.7794648 9.3429507 61.1638415 9.3403838 61.1641268 8.19212324" />
        <polyline points="61.1629859 11.0060176 64.9654225 11.0085845 64.9651373 12.1571303 61.1627007 12.1542782 61.1629859 11.0060176" />
        <polygon points="61.1629859 11.0060176 64.9654225 11.0085845 64.9651373 12.1571303 61.1627007 12.1542782" />
        <polyline points="47.2158697 12.1300352 47.2181514 5.3106338 49.2699613 5.31205986 49.2673944 12.1317465 47.2158697 12.1300352" />
        <polygon points="47.2158697 12.1300352 47.2181514 5.3106338 49.2699613 5.31205986 49.2673944 12.1317465" />
        <polyline points="37.7882113 12.181088 37.7907782 5.36168662 39.842588 5.36311268 39.8403063 12.1825141 37.7882113 12.181088" />
        <polygon points="37.7882113 12.181088 37.7907782 5.36168662 39.842588 5.36311268 39.8403063 12.1825141 37.7882113 12.181088" />
        <path d="M39.1512359,12.1819437 L39.5679296,11.07675 L41.1032218,11.0351092 C42.8826549,11.0359648 43.9590423,10.0462817 43.9596127,8.73972887 C43.9601831,7.16022887 42.5255704,6.41269014 41.420662,6.41211972 L39.5553803,6.3102993 L39.2972641,5.36254225 L41.4642993,5.36425352 C43.9561901,5.36596479 46.1126725,6.70246479 46.1121021,8.80589789 C46.1112465,10.9235915 43.9539085,12.1856514 41.4614472,12.1836549 L39.1512359,12.1819437" />
        <path
          d="M39.1512359,12.1819437 L39.5679296,11.07675 L41.1032218,11.0351092 C42.8826549,11.0359648 43.9590423,10.0462817 43.9596127,8.73972887 C43.9601831,7.16022887 42.5255704,6.41269014 41.420662,6.41211972 L39.5553803,6.3102993 L39.2972641,5.36254225 L41.4642993,5.36425352 C43.9561901,5.36596479 46.1126725,6.70246479 46.1121021,8.80589789 C46.1112465,10.9235915 43.9539085,12.1856514 41.4614472,12.1836549 L39.1512359,12.1819437 Z"
          strokeWidth="0.144"
        />
        <polyline points="37.7853592 20.7494049 37.7876408 13.9300035 39.8397359 13.9314296 39.8374542 20.750831 37.7853592 20.7494049" />
        <polygon points="37.7853592 20.7494049 37.7876408 13.9300035 39.8397359 13.9314296 39.8374542 20.750831 37.7853592 20.7494049" />
        <path d="M39.148669,20.7502606 L39.5650775,19.6450669 L41.1003697,19.6031408 C42.8798028,19.6045669 43.9561901,18.6148838 43.9564754,17.308331 C43.9570458,15.7291162 42.5224331,14.9812923 41.4178099,14.9804366 L39.5525282,14.8786162 L39.2941268,13.9311444 L41.4608768,13.9325704 C43.953338,13.9342817 46.1095352,15.2710669 46.1086796,17.3742148 C46.1081092,19.4919085 43.9510563,20.7539683 41.4585951,20.752257 L39.148669,20.7502606" />
        <path
          d="M39.148669,20.7502606 L39.5650775,19.6450669 L41.1003697,19.6031408 C42.8798028,19.6045669 43.9561901,18.6148838 43.9564754,17.308331 C43.9570458,15.7291162 42.5224331,14.9812923 41.4178099,14.9804366 L39.5525282,14.8786162 L39.2941268,13.9311444 L41.4608768,13.9325704 C43.953338,13.9342817 46.1095352,15.2710669 46.1086796,17.3742148 C46.1081092,19.4919085 43.9510563,20.7539683 41.4585951,20.752257 L39.148669,20.7502606 Z"
          strokeWidth="0.144"
        />
        <polyline points="58.5196479 20.7956092 58.5219296 13.401507 60.5024366 13.4029331 60.4995845 20.7970352 58.5196479 20.7956092" />
        <polygon points="58.5196479 20.7956092 58.5219296 13.401507 60.5024366 13.4029331 60.4995845 20.7970352 58.5196479 20.7956092" />
        <polyline points="69.4674824 20.8606373 69.4694789 15.7924331 71.4497007 15.7941444 71.4479894 20.8620634 69.4674824 20.8606373" />
        <polygon points="69.4674824 20.8606373 69.4694789 15.7924331 71.4497007 15.7941444 71.4479894 20.8620634 69.4674824 20.8606373" />
        <polyline points="69.4703345 13.4237535 71.4505563 13.4248944 71.4499859 14.7314472 69.4697641 14.7303063 69.4703345 13.4237535" />
        <polygon points="69.4703345 13.4237535 71.4505563 13.4248944 71.4499859 14.7314472 69.4697641 14.7303063" />
        <path d="M76.154831,19.5301268 L76.1565423,14.4907289 L78.1795458,14.4921549 L78.1778345,19.3019577 C78.1778345,19.9479613 79.282743,20.1498908 79.9139155,19.9348415 L79.9133451,21.054581 C78.5503204,21.3697394 76.1542606,21.3246761 76.154831,19.5301268" />
        <path
          d="M76.154831,19.5301268 L76.1565423,14.4907289 L78.1795458,14.4921549 L78.1778345,19.3019577 C78.1778345,19.9479613 79.282743,20.1498908 79.9139155,19.9348415 L79.9133451,21.054581 C78.5503204,21.3697394 76.1542606,21.3246761 76.154831,19.5301268 Z"
          strokeWidth="0.144"
        />
        <polyline points="74.5773275 16.8728134 74.5776127 15.7961408 79.8580141 15.7998486 79.8577289 16.8765211 74.5773275 16.8728134" />
        <polygon points="74.5773275 16.8728134 74.5776127 15.7961408 79.8580141 15.7998486 79.8577289 16.8765211" />
        <path d="M50.3991127,17.6186408 L53.5846373,17.6129366 C53.4987887,16.844007 52.9249437,16.4124824 52.0638908,16.4121972 C51.13125,16.4116268 50.4282042,16.7698521 50.3991127,17.6186408 Z M50.3845669,18.5644014 C50.4843908,20.5312183 54.4448345,19.8304542 54.9758979,19.2708697 L54.9753275,20.4627676 C54.1861479,20.8358239 53.1693697,20.8780352 52.0410739,20.8768944 C49.9844155,20.8754683 48.3176408,19.8264613 48.3182113,18.1177606 C48.3190669,16.595588 49.8549296,15.3914261 52.0427852,15.3928521 C53.7289542,15.393993 55.5939507,16.1848838 55.4638944,18.5681092 L50.3845669,18.5644014 Z" />
        <path
          d="M50.3991127,17.6186408 L53.5846373,17.6129366 C53.4987887,16.844007 52.9249437,16.4124824 52.0638908,16.4121972 C51.13125,16.4116268 50.4282042,16.7698521 50.3991127,17.6186408 Z M50.3845669,18.5644014 C50.4843908,20.5312183 54.4448345,19.8304542 54.9758979,19.2708697 L54.9753275,20.4627676 C54.1861479,20.8358239 53.1693697,20.8780352 52.0410739,20.8768944 C49.9844155,20.8754683 48.3176408,19.8264613 48.3182113,18.1177606 C48.3190669,16.595588 49.8549296,15.3914261 52.0427852,15.3928521 C53.7289542,15.393993 55.5939507,16.1848838 55.4638944,18.5681092 L50.3845669,18.5644014 Z"
          strokeWidth="0.144"
        />
        <path d="M53.0427359,8.25800704 L54.3769542,8.25886268 C54.9080176,8.25914789 55.6686761,7.9151831 55.6689613,7.3481831 C55.6692465,6.72357042 55.0403556,6.4218169 54.4066162,6.42124648 L53.0433063,6.42039085 L53.0427359,8.25800704 Z M57.7207711,7.1128838 C57.7202007,8.73516549 56.1931796,8.8569507 56.1130352,8.86294014 C56.3568908,9.02123239 56.5747923,9.33525 56.5864859,9.35150704 L58.1577148,12.1519965 L56.0166338,12.1502852 L54.9359683,10.1113099 C54.9214225,10.0759437 54.6490458,9.40769366 53.8148028,9.4213838 L53.0564261,9.42081338 L53.0555704,12.1488592 L51.0220141,12.1474331 L51.0240106,5.29894014 L54.7015246,5.30150704 C55.7308521,5.30236268 57.7213415,5.56219014 57.7207711,7.1128838 Z" />
        <path
          d="M53.0427359,8.25800704 L54.3769542,8.25886268 C54.9080176,8.25914789 55.6686761,7.9151831 55.6689613,7.3481831 C55.6692465,6.72357042 55.0403556,6.4218169 54.4066162,6.42124648 L53.0433063,6.42039085 L53.0427359,8.25800704 Z M57.7207711,7.1128838 C57.7202007,8.73516549 56.1931796,8.8569507 56.1130352,8.86294014 C56.3568908,9.02123239 56.5747923,9.33525 56.5864859,9.35150704 L58.1577148,12.1519965 L56.0166338,12.1502852 L54.9359683,10.1113099 C54.9214225,10.0759437 54.6490458,9.40769366 53.8148028,9.4213838 L53.0564261,9.42081338 L53.0555704,12.1488592 L51.0220141,12.1474331 L51.0240106,5.29894014 L54.7015246,5.30150704 C55.7308521,5.30236268 57.7213415,5.56219014 57.7207711,7.1128838 Z"
          strokeWidth="0.144"
        />
        <path d="M60.4861796,18.306 C60.4858944,19.1661972 61.2628099,19.8643944 62.2219754,19.8646796 C63.1808556,19.8655352 63.9583415,19.1684789 63.9586268,18.3082817 C63.958912,17.4480845 63.1817113,16.7501725 62.222831,16.7496021 C61.2642359,16.7487465 60.4864648,17.4455176 60.4861796,18.306 Z M59.8980739,18.2483873 C59.8986444,16.3600035 61.1472993,15.5999155 62.9332923,15.6013415 C64.6017782,15.6024824 65.939419,16.4934824 65.9385634,18.2523803 C65.937993,19.9682113 64.5855211,20.9864155 62.9176056,20.9852746 C60.9872958,20.9838486 59.8972183,20.1647218 59.8980739,18.2483873 Z" />
        <path
          d="M60.4861796,18.306 C60.4858944,19.1661972 61.2628099,19.8643944 62.2219754,19.8646796 C63.1808556,19.8655352 63.9583415,19.1684789 63.9586268,18.3082817 C63.958912,17.4480845 63.1817113,16.7501725 62.222831,16.7496021 C61.2642359,16.7487465 60.4864648,17.4455176 60.4861796,18.306 Z M59.8980739,18.2483873 C59.8986444,16.3600035 61.1472993,15.5999155 62.9332923,15.6013415 C64.6017782,15.6024824 65.939419,16.4934824 65.9385634,18.2523803 C65.937993,19.9682113 64.5855211,20.9864155 62.9176056,20.9852746 C60.9872958,20.9838486 59.8972183,20.1647218 59.8980739,18.2483873 Z"
          strokeWidth="0.144"
        />
      </g>
    </svg>
  );
