import React from "react";
import download_arrow from "./images/download_arrow.png";
import {
  Card,
  Devider,
  DownloadButton,
  ButtonWrapper,
  Image,
  Title,
  SubTitle,
  Updated,
} from "./styled/CardStyles";

const ProductCard = ({ product }) => {
  const { productName, supplierName, blob, type, updateTimestamp } = {
    ...product,
  };

  const checkUpdateTimestamp = Date.parse(updateTimestamp);
  const now = Date.parse(new Date());
  const moreThanThreeDaysAgo = checkUpdateTimestamp + 259200000 < now;

  function base64ToArrayBuffer(base64) {
    const binaryString = window.atob(base64);
    const binaryLen = binaryString.length;
    const bytes = new Uint8Array(binaryLen);
    for (let i = 0; i < binaryLen; i++) {
      let ascii = binaryString.charCodeAt(i);
      bytes[i] = ascii;
    }
    return bytes;
  }

  function saveByteArray(reportName, byte) {
    const blob = new Blob([byte], { type: type });
    console.log(blob instanceof Blob, type);
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    const fileName = reportName;
    link.download = fileName;
    link.click();
  }

  function downloadFile() {
    const sampleArr = base64ToArrayBuffer(blob);
    saveByteArray(productName, sampleArr);
  }

  return (
    <Card>
      <Devider>
        <Title>
          {productName}
          {!moreThanThreeDaysAgo || <Updated> *</Updated>}
        </Title>
        <SubTitle>{supplierName}</SubTitle>
      </Devider>
      <ButtonWrapper>
        <DownloadButton
          disabled={blob === null}
          availble={blob !== null}
          onClick={() => downloadFile()}
        >
          <Image src={download_arrow} alt="download"></Image>
        </DownloadButton>
      </ButtonWrapper>
    </Card>
  );
};

export default ProductCard;
