import {useState} from "react";
import CreateAdminBrandDialog from "@/components/admin/brands/CreateAdminBrandDialog";

const AdminDialogs = () => {
    const [openCreate, setOpenCreate] = useState(false);

    const handleCreateDialog = () => {
        setOpenCreate(false);
    }

    return (
        <>
            <CreateAdminBrandDialog
                open={openCreate}
                setOpenAction={setOpenCreate}
            />
        </>
    );
};

export default AdminDialogs;