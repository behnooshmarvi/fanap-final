import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';


const columns = [
  { field: 'id',  headerName: 'شناسه', width: 80  },
  { field: 'Name', headerName: 'نام', width: 160 },
  { field: 'userName', headerName: 'نام کاربری', width: 160 }

];

const rows = [
  { id: 1, userName: 'shiriiin', Name: 'شیرین' },
  { id: 2, userName: 'hesam.hesam', Name: 'حسام' },
  { id: 3, userName: 'rezaaaa', Name: 'رضا'},
  { id: 4, userName: 'behnoosh71', Name: 'بهنوش' },
  { id: 5, userName: 'mohamad70', Name: 'محمد' },
  { id: 6, userName: 'behnoosh71', Name: 'بهنوش' },
  { id: 7, userName: 'mohamad70', Name: 'محمد' },
  { id: 8, userName: 'behnoosh71', Name: 'بهنوش' },
  { id: 9, userName: 'mohamad70', Name: 'محمد' },
  { id: 10, userName: 'behnoosh71', Name: 'بهنوش' },
  { id: 11, userName: 'mohamad70', Name: 'محمد' },
  { id: 12, userName: 'behnoosh71', Name: 'بهنوش' },
  { id: 13, userName: 'mohamad70', Name: 'محمد' },
  { id: 14, userName: 'behnoosh71', Name: 'بهنوش' },
  { id: 15, userName: 'mohamad70', Name: 'محمد' }
];

export default function User() {
  return (
    <div style={{ height: 400, width: '60%', marginRight: -180 }}>
      <DataGrid rows={rows} columns={columns} scrollbarSize={5} checkboxSelection rowsPerPageOptions={[]} />
    </div>
  );
}
