import axios from 'axios';
import React from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import { Download } from 'react-bootstrap-icons';

type Props = {
  options: string[];
  getData: (option: string) => void;
  selectedOption: string;
  //data: any[];
};

function DownloadButton({ options, getData }: Props) {
  const downloadCSV = () => {
    const headers = {
      'Content-Type': 'text/csv',
    };
    axios
      .get('/api/csv', {
        responseType: 'blob',
        headers,
      })
      .then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'data.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((err) => console.log(err));
  };

  const downloadPDF = () => {
    const headers = {
      'Content-Type': 'application/pdf',
    };
    axios
      .get('/api/pdf', {
        responseType: 'blob',
        headers,
      })
      .then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'data.pdf');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((err) => console.log(err));
  };

  const downloadPNG = () => {
    const headers = {
      'Content-Type': 'image/png',
    };
    axios
      .get('/api/png', {
        responseType: 'blob',
        headers,
      })
      .then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'data.png');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((err) => console.log(err));
  };

  const handleSelect = (eventKey: string) => {
    console.log('Option selected:', eventKey);
    getData(eventKey);
    if (eventKey === 'csv') {
      downloadCSV();
    } else if (eventKey === 'pdf') {
      downloadPDF();
    } else if (eventKey === 'png') {
      downloadPNG();
    }
  };

  return (
    <DropdownButton
      title={<Download />}
      id="dropdown-menu-align-right"
      onSelect={(eventKey) => handleSelect(eventKey as string)}
      className="me-10 "
    >
      {options.includes('csv') && (
        <Dropdown.Item eventKey="csv">CSV</Dropdown.Item>
      )}
      {options.includes('pdf') && (
        <Dropdown.Item eventKey="pdf">PDF</Dropdown.Item>
      )}
      {options.includes('png') && (
        <Dropdown.Item eventKey="png">PNG</Dropdown.Item>
      )}
    </DropdownButton>
  );
}

export default DownloadButton;
