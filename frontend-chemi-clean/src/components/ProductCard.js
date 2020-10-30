import React from "react";
import styled from "styled-components";
import download_arrow from "./images/download_arrow.png";

const Card = styled.div`
  max-height: 120px;
  min-height: 120px;
  border-radius: 10px;
  border: 1px solid #ccc;
  display: grid;
  grid-template-columns: 2fr 1fr;
  align-items: center;
  padding: 15px;
  background-color: white;
  -webkit-box-shadow: 0px 8px 16px -6px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 8px 16px -6px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 8px 16px -6px rgba(0, 0, 0, 0.75);
  transition: all 0.3s ease;
  :hover {
    transform: scale(1.01);
    -webkit-box-shadow: 0px 8px 77px -3px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 0px 8px 77px -3px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 8px 77px -3px rgba(0, 0, 0, 0.75);
  }
`;

const Devider = styled.div`
  display: grid;
  grid-template-rows: 70% 30%;
  height: 100%;
`;

const DownloadButton = styled.button`
  border: 0;
  background-color: ${(props) => (props.availble ? "#1976d2" : "grey")};
  border-radius: 50%;
  :focus {
    outline: none;
  }
  :hover {
    background-color: ${(props) => (props.availble ? "##0d3d6c" : "grey")};
    cursor: ${(props) => (props.availble ? "pointer" : "not-allowed")};
  }
`;

const ButtonWrapper = styled.div`
  display: grid;
  place-items: center;
`;

const Image = styled.img`
  padding: 1.5rem;
  width: 50px;
`;

const Title = styled.h4`
  overflow: auto;
  max-height: 85px;
  font-size: 2rem;
  margin: 0;
  word-break: break-word;
  align-self: center;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const SubTitle = styled.p`
  margin: 0;
  color: gray;
  align-self: end;
`;

const ProductCard = ({ product }) => {
  const { productName, supplierName, blob, type } = { ...product };

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
    // text/html
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
        <Title>{productName}</Title>
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
