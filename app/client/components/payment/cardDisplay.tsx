import React from "react";
import { Inlineable } from "./inlineable";

export interface CardProps {
  last4: string;
  type: string;
  stripePublicKeyForUpdate?: string;
}

export interface CardDisplayProps extends CardProps, Inlineable {
  margin?: string;
}

const cardTypeToSVG = (cardType: string) => {
  const backgroundImage: string | undefined = (() => {
    switch (cardType.toLowerCase().replace(/\s/g, "")) {
      case "mastercard":
        return "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1NCIgaGVpZ2h0PSIzNSI+PHBhdGggZmlsbD0iIzIxMjA1RiIgZD0iTTAgMGg1NHYzNUgwVjB6Ii8+PHBhdGggZmlsbD0iIzk0MUIxRSIgZD0iTTE5LjIgNS44QzEyLjkgNS45IDcuNyAxMSA3LjcgMTcuNGMwIDYuNCA1LjIgMTEuNiAxMS41IDExLjYgMyAwIDUuNy0xLjEgNy44LTNsMS4yLTEuMmgtMi40bC0uOS0xLjJIMjlsLjctMS4yaC01LjRsLS41LTEuMmg2LjRjLjQtMS4yLjYtMi40LjYtMy43IDAtLjgtLjEtMS43LS4zLTIuNWgtNy4xbC4zLTEuMmg2LjRjLS4xLS40LS4zLS44LS41LTEuMmgtNS40Yy4yLS40LjQtLjguNy0xLjJIMjlsLS45LTEuMmgtMi4zYy40LS40LjctLjggMS4yLTEuMi0yLTItNC43LTMuMi03LjgtMy4yeiIvPjxwYXRoIGZpbGw9IiNGMjY3MjIiIGQ9Ik00Ni4zIDE3LjRjMCA2LjQtNS4yIDExLjYtMTEuNSAxMS42LTYuNCAwLTExLjUtNS4yLTExLjUtMTEuNiAwLTYuNCA1LjItMTEuNiAxMS41LTExLjZTNDYuMyAxMSA0Ni4zIDE3LjR6Ii8+PHBhdGggZmlsbD0iI0Y4OTkxRCIgZD0iTTQ2LjMgMTcuNWMwIDYuNC01LjIgMTEuNi0xMS41IDExLjYtNi40IDAtMTEuNS01LjItMTEuNS0xMS42IDAtNi40IDUuMi0xMS42IDExLjUtMTEuNnMxMS41IDUuMiAxMS41IDExLjZ6Ii8+PHBhdGggZmlsbD0iI0NCMjAyNiIgZD0iTTE5LjIgNS45QzEyLjkgNiA3LjcgMTEuMiA3LjcgMTcuNWMwIDYuNCA1LjIgMTEuNiAxMS41IDExLjYgMyAwIDUuNy0xLjEgNy44LTNsMS4yLTEuMmgtMi40bC0uOS0xLjJIMjlsLjctMS4yaC01LjRsLS41LTEuMmg2LjRjLjQtMS4yLjYtMi40LjYtMy43IDAtLjgtLjEtMS43LS4zLTIuNWgtNy4xbC4zLTEuMmg2LjRjLS4xLS40LS4zLS44LS41LTEuMmgtNS40Yy4yLS40LjQtLjguNy0xLjJIMjlsLS45LTEuMmgtMi4zYy40LS42LjgtMSAxLjItMS4zLTItMS45LTQuNy0zLTcuOC0zLjF6Ii8+PHBhdGggZmlsbD0iIzIxMjA1RiIgZD0iTTIzLjEgMjAuOGwuMi0xSDIzYy0uNCAwLS41LS4yLS40LS40bC40LTIuMWguNmwuMS0xLjJoLS42bC4xLS43aC0xLjNzLS43IDQtLjcgNC41YzAgLjcuNCAxIDEgMSAuNC4xLjggMCAuOS0uMXptLjQtMmMwIDEuNyAxLjEgMi4yIDIuMSAyLjIuOSAwIDEuNC0uMiAxLjQtLjJsLjItMS4ycy0uOC4zLTEuNC4zYy0xLjMgMC0xLjEtMS0xLjEtMWgyLjVzLjItLjguMi0xLjFjMC0uOC0uNC0xLjgtMS44LTEuOC0xLjIgMC0yLjEgMS4zLTIuMSAyLjh6bTIuMS0xLjdjLjcgMCAuNi44LjYuOGgtMS40cy4yLS44LjgtLjh6bTcuOCAzLjdsLjItMS4zcy0uNi4zLTEgLjNjLS45IDAtMS4yLS43LTEuMi0xLjQgMC0xLjUuOC0yLjMgMS42LTIuMy42IDAgMS4xLjQgMS4xLjRsLjItMS4zcy0uNi0uNC0xLjItLjRjLTEuOSAwLTMgMS4zLTMgMy42IDAgMS41LjggMi42IDIuMyAyLjYuNCAwIDEtLjIgMS0uMnpNMTYuMyAxNmMtLjggMC0xLjUuMy0xLjUuM2wtLjIgMS4xcy41LS4yIDEuMy0uMmMuNSAwIC44LjEuOC40di4zaC0uNWMtMS4yIDAtMi4yLjUtMi4yIDEuOCAwIDEuMS43IDEuMyAxLjIgMS4zLjkgMCAxLjItLjUgMS4yLS42di41aDEuMWwuNS0zLjRjMC0xLjQtMS4yLTEuNS0xLjctMS41em0uMiAyLjhjMCAuMi0uMSAxLjItLjggMS4yLS40IDAtLjUtLjMtLjUtLjUgMC0uMy4yLS43IDEuMS0uN2guMnptMi43IDIuMmMuMyAwIDEuOS4xIDEuOS0xLjYgMC0xLjUtMS41LTEuMi0xLjUtMS44IDAtLjMuMi0uNC43LS40LjIgMCAuOC4xLjguMWwuMi0xLjFzLS40LS4xLTEuMS0uMWMtLjkgMC0xLjguNC0xLjggMS42IDAgMS40IDEuNSAxLjMgMS41IDEuOSAwIC40LS40LjQtLjguNC0uNiAwLTEuMS0uMi0xLjEtLjJsLS4yIDEuMWMwLS4xLjMuMSAxLjQuMXptMjQuMy02bC0uMiAxLjdzLS41LS42LTEuMi0uNmMtMS40IDAtMi4xIDEuNC0yLjEgMi45IDAgMSAuNSAyIDEuNSAyIC43IDAgMS4xLS41IDEuMS0uNWwtLjEuNGgxLjJsLjktNS45aC0xLjF6bS0uNSAzLjJjMCAuNy0uMyAxLjUtMSAxLjUtLjQgMC0uNi0uNC0uNi0xIDAtMSAuNC0xLjYgMS0xLjYuNC4xLjYuNC42IDEuMXpNOS43IDIwLjlsLjctNC40LjEgNC40aC44bDEuNi00LjQtLjcgNC40aDEuM2wxLTUuOWgtMmwtMS4yIDMuNlYxNUg5LjRsLTEgNS45aDEuM3ptMTguOSAwYy40LTIgLjUtMy42IDEuNS0zLjMuMi0uOC41LTEuNS43LTEuOCAwIDAtLjEtLjEtLjQtLjEtLjYgMC0xLjMgMS4xLTEuMyAxLjFsLjEtLjdoLTEuMWwtLjggNC44aDEuM3pNMzYgMTZjLS44IDAtMS41LjMtMS41LjNsLS4yIDEuMXMuNS0uMiAxLjMtLjJjLjUgMCAuOC4xLjguNHYuM2gtLjVjLTEuMiAwLTIuMi41LTIuMiAxLjggMCAxLjEuNyAxLjMgMS4yIDEuMy45IDAgMS4yLS41IDEuMi0uNnYuNWgxLjFsLjUtMy40YzAtMS40LTEuMy0xLjUtMS43LTEuNXptLjIgMi44YzAgLjItLjEgMS4yLS44IDEuMi0uNCAwLS41LS4zLS41LS41IDAtLjMuMi0uNyAxLjEtLjdoLjJ6bTIuNyAyLjFjLjItMS41LjYtMy42IDEuNS0zLjMuMi0uOCAwLS44LS4zLS44aC0uN2wuMS0uN2gtMS4xbC0uOCA0LjhoMS4zeiIvPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0yMy40IDIwLjVsLjItMWgtLjNjLS40IDAtLjUtLjItLjQtLjRsLjMtMi4xaC42bC4yLTEuMmgtLjZsLjEtLjdoLTEuMnMtLjcgNC0uNyA0LjVjMCAuNy40IDEgMSAxIC4zIDAgLjctLjEuOC0uMXptLjQtMmMwIDEuNyAxLjEgMi4yIDIuMSAyLjIuOSAwIDEuMy0uMiAxLjMtLjJsLjItMS4ycy0uNy4zLTEuMy4zYy0xLjMgMC0xLjEtMS0xLjEtMWgyLjVzLjItLjguMi0xLjFjMC0uOC0uNC0xLjgtMS44LTEuOC0xLjItLjEtMi4xIDEuMy0yLjEgMi44em0yLjItMS44Yy43IDAgLjYuOC42LjhoLTEuNHMuMS0uOC44LS44em03LjcgMy44bC4yLTEuM3MtLjYuMy0xIC4zYy0uOSAwLTEuMi0uNy0xLjItMS40IDAtMS41LjgtMi4zIDEuNi0yLjMuNiAwIDEuMS40IDEuMS40bC4yLTEuM3MtLjctLjMtMS40LS4zYy0xLjQgMC0yLjggMS4yLTIuOCAzLjUgMCAxLjUuNyAyLjUgMi4yIDIuNS41IDAgMS4xLS4xIDEuMS0uMXptLTE3LTQuOWMtLjggMC0xLjUuMy0xLjUuM0wxNSAxN3MuNS0uMiAxLjMtLjJjLjUgMCAuOC4xLjguNHYuM2gtLjVjLTEuMSAwLTIuMi41LTIuMiAxLjggMCAxLjEuNyAxLjMgMS4yIDEuMy45IDAgMS4yLS42IDEuMy0uNnYuNUgxOGwuNS0zLjRjLS4yLTEuNC0xLjQtMS41LTEuOC0xLjV6bS4yIDIuOGMwIC4yLS4xIDEuMi0uOSAxLjItLjQgMC0uNS0uMy0uNS0uNSAwLS4zLjItLjcgMS4xLS43aC4zem0yLjYgMi4yYy4zIDAgMS45LjEgMS45LTEuNiAwLTEuNS0xLjUtMS4yLTEuNS0xLjggMC0uMy4yLS40LjctLjQuMiAwIC44LjEuOC4xbC4yLTEuMXMtLjQtLjEtMS4xLS4xYy0uOSAwLTEuOC40LTEuOCAxLjYgMCAxLjQgMS41IDEuMyAxLjUgMS45IDAgLjQtLjQuNC0uOC40LS42IDAtMS4xLS4yLTEuMS0uMmwtLjIgMS4xYzAtLjEuNC4xIDEuNC4xem0yNC40LTUuOWwtLjMgMS42cy0uNS0uNi0xLjItLjZjLTEuMSAwLTIuMSAxLjQtMi4xIDIuOSAwIDEgLjUgMiAxLjUgMiAuNyAwIDEuMS0uNSAxLjEtLjVsLjEuNGgxLjJsLjktNS45LTEuMi4xem0tLjYgMy4yYzAgLjYtLjMgMS41LTEgMS41LS40IDAtLjYtLjQtLjYtMSAwLTEgLjQtMS42IDEtMS42LjQuMS42LjQuNiAxLjF6TTEwIDIwLjVsLjctNC40LjEgNC40aC44bDEuNi00LjQtLjcgNC40aDEuM2wxLTUuOWgtMS45bC0xLjIgMy42LS4xLTMuNkg5LjhsLTEgNS45SDEwem0xOC45IDBjLjQtMiAuNC0zLjcgMS4zLTMuNC4xLS44LjMtMS4xLjUtMS40aC0uMmMtLjYgMC0xIC44LTEgLjhsLjEtLjdoLTEuMWwtLjggNC44aDEuMnYtLjF6bTcuNy00LjljLS44IDAtMS41LjMtMS41LjNsLS4yIDEuMXMuNS0uMiAxLjMtLjJjLjUgMCAuOC4xLjguNHYuM2gtLjVjLTEuMSAwLTIuMi41LTIuMiAxLjggMCAxLjEuNyAxLjMgMS4yIDEuMy45IDAgMS4yLS42IDEuMy0uNnYuNWgxLjFsLjUtMy40Yy0uMS0xLjQtMS40LTEuNS0xLjgtMS41em0uMiAyLjhjMCAuMi0uMSAxLjItLjkgMS4yLS40IDAtLjUtLjMtLjUtLjUgMC0uMy4yLS43IDEuMS0uN2guM3ptMi40IDIuMWMuNC0yIC40LTMuNyAxLjMtMy40LjEtLjguMy0xLjEuNS0xLjRoLS4yYy0uNiAwLTEgLjgtMSAuOGwuMS0uN2gtMS4xbC0uOCA0LjdoMS4yeiIvPjwvc3ZnPg==)";
      case "visa":
        return "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1NCIgaGVpZ2h0PSIzNSI+PHBhdGggZmlsbD0iI0VBRUFFQSIgZD0iTTAgMGg1NHYzNUgwVjB6Ii8+PHBhdGggZmlsbD0iIzI5MzY4OSIgZD0iTTIxLjQgMjMuNGwyLTExLjloMy4zbC0yIDExLjloLTMuM3ptMTQuOC0xMS41Yy0uNi0uMi0xLjctLjUtMi45LS41LTMuMiAwLTUuNSAxLjYtNS41IDMuOSAwIDEuNyAxLjYgMi43IDIuOSAzLjIgMS4zLjYgMS43IDEgMS43IDEuNSAwIC44LTEgMS4yLTEuOSAxLjItMS4zIDAtMi0uMi0zLjEtLjZsLS40LS4yLS42IDIuNmMuOC4zIDIuMi42IDMuNi42IDMuNCAwIDUuNi0xLjYgNS43LTQuMSAwLTEuMy0uOS0yLjQtMi43LTMuMi0xLjEtLjUtMS44LS45LTEuOC0xLjUgMC0uNS42LTEgMS45LTEgMS4xIDAgMS44LjIgMi40LjVsLjMuMS40LTIuNXptNS41LS4zYy0uOCAwLTEuMy4yLTEuNyAxbC00LjggMTAuOWgzLjRsLjctMS44aDQuMWwuNCAxLjhoMy4xbC0yLjctMTEuOWgtMi41em0tMS40IDcuNmMuMy0uNyAxLjMtMy4zIDEuMy0zLjNsLjQtMS4xLjIgMSAuOCAzLjRoLTIuN3ptLTI0LjkuNWwtLjMtMS42Yy0uNi0xLjktMi40LTMuOS00LjUtNWwyLjkgMTAuM0gxN2w1LjItMTEuOWgtMy40bC0zLjQgOC4yeiIvPjxwYXRoIGZpbGw9IiNGODk5MUQiIGQ9Ik03LjEgMTEuNnYuMmM0LjEgMSA2LjkgMy41IDggNi4zTDE0IDEyLjZjLS4yLS44LS44LTEtMS41LTFINy4xeiIvPjwvc3ZnPg==)";
      case "amex":
      case "americanexpress":
        return "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1NCIgaGVpZ2h0PSIzNSI+PHBhdGggZmlsbD0iIzAwQzBGNCIgZD0iTTAgMGg1NHYzNUgwVjB6Ii8+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTQuOSAxMi40bC0xLTIuNS0xIDIuNWgyem0yMi45LS45Yy0uMi4xLS41LjEtLjguMWgtMS44di0xLjRIMjdjLjMgMCAuNSAwIC43LjEuMi4xLjMuMy4zLjYuMS4yLS4xLjUtLjIuNnptMTMuMSAxbC0xLTIuNS0xIDIuNWgyem0tMjQuNSAyLjdoLTEuNnYtNWwtMi4yIDVoLTEuM2wtMi4yLTV2NUg2bC0uNi0xLjRIMi4zbC0uNiAxLjRIMGwyLjctNi4zSDVsMi42IDZ2LTZoMi41bDIgNC4zIDEuOC00LjNoMi41djYuM3ptNi4yIDBoLTUuMVY4LjloNS4xdjEuM0gxOXYxLjFoMy41djEuM0gxOXYxLjNoMy41djEuM3ptNy4xLTQuNmMwIDEtLjcgMS41LTEuMSAxLjcuMy4xLjYuMy44LjUuMi4zLjMuNi4zIDEuMnYxLjJoLTEuNXYtLjhjMC0uNCAwLS45LS4yLTEuMi0uMi0uMi0uNi0uMy0xLjEtLjNoLTEuN3YyLjNoLTEuNVY4LjloMy41Yy44IDAgMS4zIDAgMS44LjMuNy40LjcgMS40LjcgMS40em0yLjUgNC42aC0xLjVWOC45aDEuNXY2LjN6bTE3LjkgMEg0OGwtMi45LTQuOHY0LjhINDJsLS42LTEuNGgtMy4ybC0uNiAxLjRoLTEuOGMtLjcgMC0xLjctLjItMi4yLS43LS41LS41LS44LTEuMy0uOC0yLjQgMC0uOS4yLTEuOC44LTIuNS42LS41IDEuNC0uNyAyLjQtLjdoMS41djEuNGgtMS40Yy0uNiAwLS45LjEtMS4yLjQtLjMuMy0uNC44LS40IDEuNCAwIC43LjEgMS4yLjQgMS41LjIuMy43LjMgMS4xLjNoLjdsMi4xLTVINDFsMi42IDZ2LTZoMi4zbDIuNyA0LjRWOC45aDEuNmwtLjEgNi4zek0wIDE2LjVoMi42bC42LTEuNGgxLjNsLjYgMS40aDUuMXYtMS4xbC41IDEuMWgyLjZsLjUtMS4xdjEuMWgxMi43di0yLjNoLjJjLjIgMCAuMiAwIC4yLjN2Mmg2LjZWMTZjLjUuMyAxLjQuNSAyLjQuNWgyLjhsLjYtMS40aDEuM2wuNiAxLjRoNS4zdi0xLjNsLjggMS4zaDQuM1Y3LjZoLTQuMnYxbC0uNi0xaC00LjN2MWwtLjUtMWgtNmMtMSAwLTEuOC4xLTIuNS41di0uNWgtNHYuNWMtLjQtLjQtMS0uNS0xLjctLjVIMTNsLTEgMi4zLTEtMi4zSDYuM3YxbC0uNS0xaC00TDAgMTEuOHY0Ljd6bTU0IDQuNmgtMi44Yy0uMyAwLS41IDAtLjYuMS0uMi4xLS4yLjMtLjIuNXMuMS40LjMuNWMuMi4xIDEuNC4xIDEuNC4xLjggMCAxLjQuMiAxLjcuNS4xIDAgLjIuMi4yLjN2LTJ6bTAgNC4yYy0uNC41LTEuMS44LTIuMS44SDQ5di0xLjRoMi45Yy4zIDAgLjUgMCAuNi0uMi4xLS4xLjItLjIuMi0uNHMtLjEtLjMtLjItLjRjLS4xLS4xLS4zLS4xLS41LS4xLTEuNCAwLTMuMiAwLTMuMi0yIDAtLjkuNi0xLjkgMi4yLTEuOWgzdi0xLjNoLTIuOGMtLjggMC0xLjUuMi0xLjkuNXYtLjVoLTQuMWMtLjcgMC0xLjQuMi0xLjguNXYtLjVIMzZ2LjZjLS42LS40LTEuNi0uNS0yLS41aC01di41Yy0uNS0uNS0xLjUtLjUtMi4xLS41aC01LjVsLTEuMyAxLjQtMS4yLTEuNGgtOC4ydjguOWg4TDIwIDI2bDEuMiAxLjRoNC45di0yLjFoLjVjLjcgMCAxLjQgMCAyLjEtLjN2Mi40aDQuMXYtMi4zaC4yYy4yIDAgLjMgMCAuMy4zdjJoMTIuNGMuOCAwIDEuNi0uMiAyLjEtLjZ2LjZoMy45Yy44IDAgMS42LS4xIDIuMi0uNGwuMS0xLjd6bS02LjEtMi41Yy4zLjMuNS43LjUgMS4zIDAgMS40LS45IDItMi40IDJoLTN2LTEuNGgzYy4zIDAgLjUgMCAuNi0uMi4xLS4xLjItLjIuMi0uNHMtLjEtLjMtLjItLjRjLS4xLS4xLS4zLS4xLS41LS4xLTEuNCAwLTMuMiAwLTMuMi0yIDAtLjkuNi0xLjkgMi4yLTEuOWgzdjEuNGgtMi44Yy0uMyAwLS41IDAtLjYuMS0uMi4xLS4yLjMtLjIuNXMuMS40LjMuNWMuMi4xIDEuNC4xIDEuNC4xLjggMCAxLjQuMSAxLjcuNXptLTEwLjgtM2g1LjF2MS4zaC0zLjZ2MS4ySDQydjEuM2gtMy41djEuM2gzLjZ2MS4zSDM3di02LjRoLjF6bS0xMC4zIDIuOWgtMnYtMS42aDJjLjUgMCAuOS4yLjkuOC4xLjUtLjMuOC0uOS44em0tMy40IDIuOUwyMSAyM2wyLjMtMi41djUuMXptLTYtLjhoLTMuN3YtMS4zSDE3di0xLjNoLTMuM1YyMWgzLjhsMS43IDEuOS0xLjggMS45em0xMi0yLjljMCAxLjgtMS4zIDIuMS0yLjYgMi4xaC0xLjl2Mi4xSDIyTDIwLjEgMjRsLTEuOSAyLjFoLTZ2LTYuNGg2LjFsMS45IDIuMSAxLjktMi4xaDQuOGMxLjIuMSAyLjUuNCAyLjUgMi4yem00LjkuNWMtLjIuMS0uNS4xLS44LjFoLTEuOHYtMS40aDEuOWMuMyAwIC41IDAgLjcuMS4yLjEuMy4zLjMuNiAwIC4yLS4yLjUtLjMuNnptMS45LS45YzAgMS0uNyAxLjUtMS4xIDEuNy4zLjEuNi4zLjguNS4yLjMuMy42LjMgMS4ydjEuMmgtMS41di0uOGMwLS40IDAtLjktLjItMS4yLS4yLS4yLS42LS4zLTEuMS0uM2gtMS43djIuM2gtMS41di02LjRoMy41Yy44IDAgMS4zIDAgMS44LjMuNy41LjcgMS41LjcgMS41eiIvPjwvc3ZnPg==)";
    }
  })();

  if (backgroundImage) {
    return (
      <span
        css={{
          display: "inline-block",
          borderRadius: "6px",
          marginRight: "9px",
          backgroundImage,
          width: "31px",
          height: "20px",
          backgroundPosition: "0 0",
          backgroundSize: "cover"
        }}
      />
    );
  }
  return null;
};

export const CardDisplay = (props: CardDisplayProps) => (
  <div
    css={{
      display: props.inline ? "inline-flex" : "flex",
      alignItems: "center",
      margin: props.margin || "10px"
    }}
  >
    {cardTypeToSVG(props.type)} Ending {props.last4}
  </div>
);
