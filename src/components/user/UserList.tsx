import * as React from 'react';
import { useEffect, useState, createContext } from 'react';
import axios from 'axios';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { Link } from 'react-router-dom';
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from '@mui/icons-material/Delete';
import { blue } from "@material-ui/core/colors";
import { red } from "@material-ui/core/colors";
import UserForm from "./UserForm";
import {
    makeStyles,
    FormControlLabel, IconButton
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    content: {
        padding: "20px"
    },
    addPersonBtn: {
        marginBottom: "20px"
    },
    toolbar: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "16px"
    },
}));



const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'firstName', headerName: 'First Name', width: 150 },
    { field: 'lastName', headerName: 'Last Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 150 },
    { field: 'age', headerName: 'Age', width: 150 },

    {
        field: "actions",
        headerName: "Actions",
        sortable: false,
        width: 150,
        renderCell: (params) => {
            return (
                <div
                    className="d-flex justify-content-between align-items-center"
                    style={{ cursor: "pointer" }}
                >
                    <MatEdit index={params.row.id} />
                </div>
            );
        }
    }
];

const MatEdit = ({ index }: any) => {

    const handleEditClick = (id: number) => {
        console.log("cAlleddd")
    };

    const handleDeleteClick = (id: number) => {

    };

    return (
        <FormControlLabel
            control={
                <>
                    <Link
                        to={`/users/${index}`}
                    >
                        <IconButton
                            color="secondary"
                            aria-label="add an alarm"
                            onClick={() => handleEditClick(index)}
                        >
                            <EditIcon style={{ color: blue[500] }} />
                        </IconButton>
                    </Link>
                    <Link
                        to="#"
                        onClick={() => handleDeleteClick(index)}
                    >
                        <IconButton
                            color="secondary"
                            aria-label="add an alarm"
                            onClick={() => handleDeleteClick(index)}
                        >
                            <DeleteIcon style={{ color: red[500] }} />
                        </IconButton>
                    </Link>
                </>
            }
            label=""
        />
    );
};

export default function UserList() {
    const { content, addPersonBtn, toolbar } = useStyles();
    const [users, setUsers] = useState<string[]>([]);
    const [showAddModal, setShowAddModal] = useState<boolean>(false);
    const [pageSize, setPageSize] = React.useState<number>(10);



    useEffect(() => {
        axios.get('/users')
            .then(function (response) {
                // handle success
                setUsers(response.data.users);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }, []);

    const addNewData = (data: any) => {
        let user = data;
        user['id'] = users.length + 1;
        setUsers([...users, user]);
    }


    return (
        <Paper className={content}>
            <div className={toolbar}>
                <Typography variant="h6" component="h2" color="primary">
                    Users
                </Typography>
                <UserForm callback={addNewData} />
            </div>
            <div style={{ height: 300, width: '100%' }}>
                <DataGrid
                    rows={users}
                    columns={columns}
                    pageSize={pageSize}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    rowsPerPageOptions={[10, 50, 100]}
                    pagination
                />
            </div>

        </Paper>
    );
}