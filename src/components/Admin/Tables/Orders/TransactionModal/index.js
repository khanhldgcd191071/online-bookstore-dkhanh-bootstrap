import React, {useState, useEffect} from 'react'
import { Container, Image, Modal, Button, Row, Col, Table } from 'react-bootstrap'

import { db } from "../../../../../firebase";
import { collection, onSnapshot, query, orderBy, where, doc } from "firebase/firestore";
import "./transactionmodal.css"

export default function TransactionModal(props) {
    const {getOrderId, openTransactionInfoModal} = props

    const [transactionInfo, setTransactionInfo] = useState({});

    const fetchTransactionData = () =>{
        if(getOrderId !== ""){
            const q = doc(db, "orders", getOrderId)
            onSnapshot(q,(querySnapshot)=>{
                setTransactionInfo(querySnapshot.data().transactionDetail);
            });
        }
    }
    useEffect(() => {
        if(collection){
            fetchTransactionData();
        }
    }, [openTransactionInfoModal])
    return(
        <>
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
            <Modal.Body>
                <Container className='transactionInfoWrapper'>
                    <Container className='transactionInfoTitle'>Shipping info - Order {getOrderId}</Container>
                    <Container className='transactionInfoBodyWrapper'>
                        <Table bordered>
                            <tbody>
                                <tr>
                                    <th>Payer ID</th>
                                    <th className='transactionInfoTableInfo'>{transactionInfo.payerId}</th>
                                </tr>
                                <tr>
                                    <th>Payer Email</th>
                                    <th className='transactionInfoTableInfo'>{transactionInfo.payerEmail}</th>
                                </tr>
                                <tr>
                                    <th>Transaction ID</th>
                                    <th className='transactionInfoTableInfo'>{transactionInfo.transactionId}</th>
                                </tr>
                                <tr>
                                    <th>Transaction status</th>
                                    <th className='transactionInfoTableInfo'>{transactionInfo.transactionStatus}</th>
                                </tr>
                                <tr>
                                    <th>Transaction time</th>
                                    <th className='transactionInfoTableInfo'>{transactionInfo.transactionTime}</th>
                                </tr>
                                <tr>
                                    <th>Transaction Amount</th>
                                    {/* <th className='transactionInfoTableInfo'>{transactionInfo.transactionUnit.amount.value}</th> */}
                                </tr>
                            </tbody>
                        </Table>
                    </Container>
                </Container>
            </Modal.Body>
        </Modal>
        </>
    )
}
