import * as React from 'react';
import { useEffect, useState, createContext, useContext } from 'react';
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import axios from 'axios';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { Link } from 'react-router-dom';
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from '@mui/icons-material/Delete';
import { blue } from "@material-ui/core/colors";
import { red } from "@material-ui/core/colors";
import Button from '@mui/material/Button';
import AddUser from './AddUser';
import EditUser from './EditUser';
import Loading from '../Loading';
import { User } from '../../utils/constants';


import {
    makeStyles,
    FormControlLabel, IconButton
} from "@material-ui/core";
import { any } from 'zod';

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


const EditModalContext = createContext<any>(any);

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
    const { stateShowEditModal, setStateShowEditModal } = useContext(EditModalContext);

    /**
     * Edit User Detail
     */
    const handleEdit = (user: any) => {
        setStateShowEditModal(true);
    }
    /**
     * Delete User
     */
    const handleDelete = async (userId: string) => {
        console.log("userId", userId)
        // setActiveId(userId);
        if (window.confirm('Are you sure you want to delete this user?')) {

        }
    }

    return (
        <FormControlLabel
            control={
                <>
                    <Link
                        to="#"
                        onClick={() => handleEdit(index)}
                    >
                        <IconButton
                            color="secondary"
                            aria-label="add an alarm"
                        >
                            <EditIcon style={{ color: blue[500] }} />
                        </IconButton>
                    </Link>
                    <Link
                        to="#"
                        onClick={() => handleDelete(index)}
                    >
                        <IconButton
                            color="secondary"
                            aria-label="add an alarm"
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
    const [pageSize, setPageSize] = React.useState<number>(10);
    const [showAddModal, setShowAddModal] = useState<boolean>(false);
    const [showEditModal, setShowEditModal] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);
    const [activeId, setActiveId] = useState<string>('');

    const handleShowAddModal = () => {
        setShowAddModal(true);
    };

    const handleShowEditModal = () => {
        setShowEditModal(true);
    };

    const getUsers = async () => {
        setIsLoading(true);
        await axios.get('/users')
            .then(function (response) {
                // handle success
                setUsers(response.data.users);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                setIsLoading(false);
            });
    }

    useEffect(() => {
        getUsers();
    }, []);

    const addNewData = (data: any) => {
        let user = data;
        user['id'] = users.length + 1;
        setUsers([...users, user]);
    }

    /**
   * Modal close callback
   */
    const onModalClose = async (modalType: string) => {
        if (modalType === 'Add') {
            setShowAddModal(false);
            console.log("Add Modal Cancel")
        }
        if (modalType === 'Edit') {
            setShowEditModal(false);
            console.log("Edit Modal Cancel")
        }
    }


    return (
        <EditModalContext.Provider value={{ stateShowEditModal: showEditModal, setStateShowEditModal: setShowEditModal }}>
            <Paper className={content}>
                <div className={toolbar}>
                    <Typography variant="h6" component="h2" color="primary">
                        Users
                    </Typography>
                    <Button
                        variant="outlined"
                        color="secondary"
                        startIcon={<PersonAddIcon />}
                        className={addPersonBtn}
                        onClick={handleShowAddModal}
                    >
                        New User
                    </Button>
                    {
                        showAddModal &&
                        <AddUser
                            onSuccess={() => onModalClose('Add')}
                            onClose={() => onModalClose('Add')}
                        />
                    }
                    {
                        showEditModal &&
                        <EditUser
                            onSuccess={() => onModalClose('Edit')}
                            userId={activeId}
                            data={selectedUser}
                            onClose={() => onModalClose('Edit')}
                        />
                    }

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
                {
                    isLoading &&
                    <Loading loadingText={'Loading...'} />
                }

            </Paper>
        </EditModalContext.Provider>
    );
}