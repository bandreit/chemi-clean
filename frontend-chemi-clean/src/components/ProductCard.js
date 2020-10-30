import React from "react";
import styled from "styled-components";
import download_arrow from "./images/download_arrow.png";
import axios from "axios";

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
  /* display: flex;
  justify-content: space-around;
  flex-direction: column; */
  display: grid;
  grid-template-rows: 70% 30%;
  height: 100%;
`;

const DownloadButton = styled.button`
  border: 0;
  background-color: #1976d2;
  border-radius: 50%;
  :focus {
    outline: none;
  }
  :hover {
    background-color: #0d3d6c;
    cursor: pointer;
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
  const { id, productName, supplierName } = { ...product };

  function base64ToArrayBuffer(base64) {
    var binaryString = window.atob(base64);
    var binaryLen = binaryString.length;
    var bytes = new Uint8Array(binaryLen);
    for (var i = 0; i < binaryLen; i++) {
      var ascii = binaryString.charCodeAt(i);
      bytes[i] = ascii;
    }
    return bytes;
  }

  function saveByteArray(reportName, byte) {
    var blob = new Blob([byte], { type: "application/pdf" });
    var link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    var fileName = reportName;
    link.download = fileName;
    link.click();
  }

  function downloadFile() {
    axios.get(`https://localhost:5001/download/${id}`).then(({ data }) => {
      var sampleArr = base64ToArrayBuffer(data);
      saveByteArray("Sample Report", sampleArr);
    });
  }

  return (
    <Card>
      <Devider>
        <Title>{productName}</Title>
        <SubTitle>{supplierName}</SubTitle>
      </Devider>
      <ButtonWrapper>
        <DownloadButton onClick={() => downloadFile()}>
          <Image src={download_arrow} alt="download"></Image>
        </DownloadButton>
      </ButtonWrapper>
    </Card>
  );
};

export default ProductCard;
