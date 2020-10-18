import React from 'react';
import bank from './bank.png';
import logo from './SBBWU.gif';
import './style.css';

const FeeChallan = () => {
  return (
    <div class='container'>
      <div class='header'>
        <div class='header-left'>
          <img src={bank} />
        </div>

        <div class='header-center'>
          <div>SHAHEED BENAZIR BHUTTO</div>
          <div>Women University</div>
        </div>

        <div class='header-right'>
          <img src={logo} />
        </div>
      </div>
      &nbsp;
      <div class='body'>
        <div class='row'>
          <div class='header-left'>
            <p>Student ID ______________________________</p>
            <p>
              Student Name ____________________________
              <br />
              <div style={{ fontSize: '12px', textAlign: 'left' }}>
                (Product/Plan Code)
              </div>
            </p>
          </div>
          <div class='header-center'></div>
          <div class='header-right'>
            <p>PV No. __________________________________</p>
            <p>UBL MCA No. ____________________________</p>
          </div>
        </div>
        <div class='row' style={{ border: '1px solid #000000' }}>
          <div class='header-left'>
            <p style={{ textAlign: 'left', paddingLeft: '15px' }}>
              Please Tick On Required Option
            </p>
            <div>
              <table style={{ border: '1px solid #000000' }}>
                <tr>
                  <th>Head Code</th>
                  <th style={{ width: '250px' }}>Head Name</th>
                  <th style={{ textAlign: 'center', width: '150px' }}>
                    Amount
                  </th>
                </tr>
                <tr>
                  <td style={{ textAlign: 'center' }}>1</td>
                  <td>Admission Fee</td>
                  <td></td>
                </tr>
                <tr>
                  <td style={{ textAlign: 'center' }}>2</td>
                  <td>Examination Fee</td>
                  <td></td>
                </tr>
                <tr>
                  <td style={{ textAlign: 'center' }}>3</td>
                  <td>Registration Fee</td>
                  <td></td>
                </tr>
                <tr>
                  <td style={{ textAlign: 'center' }}>4</td>
                  <td>Hostel Fee</td>
                  <td></td>
                </tr>
                <tr>
                  <td style={{ textAlign: 'center' }}>5</td>
                  <td>Degree/Transcript</td>
                  <td></td>
                </tr>
                <tr>
                  <td style={{ textAlign: 'center' }}>6</td>
                  <td>Course Fee</td>
                  <td></td>
                </tr>
                <tr>
                  <td style={{ textAlign: 'center' }}>7</td>
                  <td>Migration Fee</td>
                  <td></td>
                </tr>
                <tr>
                  <td style={{ textAlign: 'center' }}>8</td>
                  <td>Re Checking Fee</td>
                  <td></td>
                </tr>
              </table>
              <p style={{ paddingRight: '380px' }}>Cash / Cheque No.</p>
              <p style={{ paddingRight: '380px' }}>Amount in words</p>
            </div>
          </div>

          <div class='header-center'></div>

          <div class='header-right' style={{ display: 'inline-flex' }}>
            <div>
              <div
                class='header-right'
                style={{ display: 'inline-flex', paddingLeft: '245px' }}
              >
                <p style={{ paddingRight: '50px' }}>
                  Cash
                  <input
                    type='checkbox'
                    id='cheque'
                    name='cheque'
                    value='cheque'
                  />
                </p>
                <p style={{ paddingRight: '30px' }}>
                  UBL Cheque
                  <input
                    type='checkbox'
                    id='cheque'
                    name='cheque'
                    value='cheque'
                  />
                </p>
              </div>
              <table style={{ border: '1px solid #000000' }}>
                <tr>
                  <th>Head Code</th>
                  <th style={{ width: '250px' }}>Head Name</th>
                  <th style={{ textAlign: 'center', width: '150px' }}>
                    Amount
                  </th>
                </tr>
                <tr>
                  <td style={{ textAlign: 'center' }}>9</td>
                  <td>Verification Fee</td>
                  <td></td>
                </tr>
                <tr>
                  <td style={{ textAlign: 'center' }}>10</td>
                  <td>Transport Fee</td>
                  <td></td>
                </tr>
                <tr>
                  <td style={{ textAlign: 'center' }}>11</td>
                  <td>Prospectus Fee</td>
                  <td></td>
                </tr>
                <tr>
                  <td style={{ textAlign: 'center' }}>12</td>
                  <td>Sports Fee</td>
                  <td></td>
                </tr>
                <tr>
                  <td style={{ textAlign: 'center' }}>13</td>
                  <td>Tution Fee</td>
                  <td></td>
                </tr>
                <tr>
                  <td style={{ textAlign: 'center' }}>14</td>
                  <td>Job Application Fee</td>
                  <td></td>
                </tr>
                <tr>
                  <td style={{ textAlign: 'center' }}>15</td>
                  <td>Miscellaneous Receipt</td>
                  <td></td>
                </tr>
                <tr>
                  <td style={{ textAlign: 'center' }}>16</td>
                  <td>Affiliation Fee</td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td>Total Amount</td>
                  <td></td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <div class='row' style={{ display: 'inline-flex' }}>
          <div class='header-left'>
            <p>Depositor Name & Signature _____________________________</p>
          </div>
          <div class='header-center'></div>
          <div class='header-right' style={{ paddingLeft: '500px' }}>
            <p>Bank's Cashier _____________________________________________</p>
          </div>
        </div>
        <div class='row' style={{ display: 'inline-flex' }}>
          <div
            class='header-left'
            style={{ display: 'inline-flex', alignSelf: 'center' }}
          >
            <p>White : UBL's Copy</p>
            <p style={{ paddingLeft: '250px' }}>Blue : Treasury's Copy</p>
            <p style={{ paddingLeft: '250px' }}>Pink : University's Copy</p>
            <p style={{ paddingLeft: '300px' }}>Green : Depositor's Copy</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeeChallan;
