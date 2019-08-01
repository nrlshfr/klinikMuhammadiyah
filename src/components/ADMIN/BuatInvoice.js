import React, { useState } from 'react';
import { Form, Input, Table, Button, InputNumber, message } from 'antd';
import firebase from 'firebase/app';
import 'firebase/firestore';

const BuatInvoice = () => {
    const columns = [
        {
            title: 'Deskripsi',
            dataIndex: 'Deskripsi',
        },
        {
            title: 'Harga',
            dataIndex: 'Harga',
        },
        {
            title: '',
            key: 'Hapus',
            render: (text, record) => (
                <Button type='danger' onClick={() => {
                    const filters = data.filter(d => d.Deskripsi !== text.Deskripsi);
                    setData(filters);
                    setTotalHarga(prev => prev - text.Harga)
                }}>Hapus</Button>
            ),
        },
    ];
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([

    ]);

    const [deskripsi, setDeskripsi] = useState('');
    const [harga, setHarga] = useState(0);
    const [totalHarga, setTotalHarga] = useState(null);

    const submitDeskripsi = (e) => {
        e.preventDefault();
        setData(prev => {
            const sample = [...prev];
            const newData = {
                Deskripsi: deskripsi,
                Harga: harga,
                key: sample.length + 1
            };
            sample.push(newData);
            return sample;
        });
        setTotalHarga(prev => prev + harga);
        setDeskripsi('');
        setHarga(null);
    }

    const [nomorInvoice, setNomorInvoice] = useState('');
    const [nomorRef, setNomorRef] = useState('');
    const [namaPasien, setNamaPasien] = useState('');
    const [Alamat, setAlamat] = useState('');
    const [Kota, setKota] = useState('');
    const [Provinsi, setProvinsi] = useState('');
    const [kodePos, setKodePos] = useState('');

    const submitInvoice = () => {
        setLoading(true);
        const d = new Date();
        const tanggal = d.getDate() > 9 ? d.getDate() : '0' + d.getDate();
        const namaBulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
        const bulan = namaBulan[d.getMonth()];
        const bulanIndex = (d.getMonth() + 1) > 9 ? (d.getMonth() + 1) : '0' + (d.getMonth() + 1);
        const tahun = d.getFullYear();
        const menit = d.getMinutes() > 9 ? d.getMinutes() : '0' + d.getMinutes();
        const detik = d.getSeconds() > 9 ? d.getSeconds() : '0' + d.getSeconds();

        const ref = firebase.firestore().collection('semua_invoice');
        ref.add({
            nomorInvoice,
            nomorRef,
            namaPasien,
            Alamat,
            Kota,
            Provinsi,
            kodePos,
            data: data,
            totalHarga,
            tanggal: `${tanggal}, ${bulan} ${tahun}`,
            index: `${tahun}${bulanIndex}${tanggal}${menit}${detik}`
        })
            .then((snap) => {
                ref.doc(snap.id).set({ id: snap.id }, { merge: true })
                    .then(() => {
                        setDeskripsi('');
                        setHarga(null);
                        setNomorInvoice('');
                        setNomorRef('');
                        setNamaPasien('');
                        setAlamat('');
                        setKota('');
                        setProvinsi('');
                        setKodePos('');
                        message.success('INVOICE TERKIRIM');
                        setLoading(false);
                    })
            })
            .catch(err => {
                message.error(err.message);
                setLoading(false);
            })
    }

    return (
        <div>
            <h1 style={{ fontSize: '2rem' }}>Buat Invoice</h1>
            <Form>
                <Form.Item>
                    <Button
                        loading={loading}
                        onClick={submitInvoice}
                        type='primary' disabled={
                            nomorInvoice === '' || nomorRef === '' || namaPasien === '' || Alamat === '' || Kota === '' || Provinsi === '' || kodePos === '' || data.length === 0 ? true : false
                        }>Masukkan Data</Button>
                </Form.Item>
                <Form.Item>
                    <Input value={nomorInvoice} onChange={e => setNomorInvoice(e.target.value)} placeholder='Nomor Invoice' />
                    <Input value={nomorRef} onChange={e => setNomorRef(e.target.value)} placeholder='Nomor Ref' />

                    <Input value={namaPasien} onChange={e => setNamaPasien(e.target.value)} placeholder='Nama Pasien' />
                    <Input value={Alamat} onChange={e => setAlamat(e.target.value)} placeholder='Alamat' />
                    <Input value={Kota} onChange={e => setKota(e.target.value)} placeholder='Kota' />
                    <Input value={Provinsi} onChange={e => setProvinsi(e.target.value)} placeholder='Provinsi' />
                    <Input value={kodePos} onChange={e => setKodePos(e.target.value)} placeholder='Kode pos' />



                </Form.Item>
            </Form>


            <Table pagination={false} columns={columns} dataSource={data} size="small" />
            <h1>Total Harga: Rp {totalHarga}</h1>

            <Form>
                <div style={{
                    display: 'flex',
                    marginTop: 20
                }}>
                    <Form.Item style={{ marginRight: 20 }}>
                        <Input placeholder='Deskripsi' value={deskripsi} onChange={e => (setDeskripsi(e.target.value))} />
                    </Form.Item>

                    <Form.Item style={{ marginRight: 20 }}>
                        <InputNumber placeholder='Harga' value={harga} type='number' onChange={e => setHarga(e)} />
                    </Form.Item>

                    <Form.Item>
                        <Button disabled={deskripsi === '' || harga === '' ? true : false} type='primary' onClick={submitDeskripsi}>Masukkan</Button>
                    </Form.Item>
                </div>
            </Form>
        </div>
    );
}

export default BuatInvoice;