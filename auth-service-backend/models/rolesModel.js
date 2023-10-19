import mongoose from "mongoose";
import Inc from "mongoose-sequence";
const AutoIncrement = Inc(mongoose);

const roleSchema = mongoose.Schema({
    roleName: {
        type: String,
        require: true,
        unique: true,
        immutable: true
    },
    roleDescription: {
        type: String,
        require: true
    }
}, {
    timestamps: true
});

// roleSchema.plugin(AutoIncrement, {
//     inc_field: 'roleID',
//     id: 'roleIDs',
//     start_seq: 1001
// })

const Role = mongoose.model('Role', roleSchema);
export default Role;