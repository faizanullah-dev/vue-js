<template>
    <div style="max-width: 800px; margin: 40px auto; font-family: sans-serif; padding: 0 20px">
        <h1>🎓 Students List</h1>

        <router-link to="/students/create">
            <button style="background: green; color: white; padding: 10px 20px; margin-bottom: 20px; border: none; border-radius: 5px; cursor: pointer">+ Add Student</button>
        </router-link>

        <!-- Success Message -->
        <div v-if="message" style="background: #d4edda; padding: 10px; margin-bottom: 15px; border-radius: 5px">
            {{ message }}
        </div>

        <!-- Loading -->
        <p v-if="loading">Loading...</p>

        <!-- Table -->
        <table border="1" width="100%" cellpadding="10" style="border-collapse: collapse" v-else>
            <thead style="background: #f0f0f0">
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Course</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(student, index) in students" :key="student.id">
                    <td>{{ index + 1 }}</td>
                    <td>{{ student.name }}</td>
                    <td>{{ student.email }}</td>
                    <td>{{ student.phone }}</td>
                    <td>{{ student.course }}</td>
                    <td>
                        <router-link :to="`/students/${student.id}/edit`">
                            <button style="background: blue; color: white; margin-right: 5px; border: none; padding: 5px 10px; cursor: pointer">Edit</button>
                        </router-link>
                        <button @click="deleteStudent(student.id)" style="background: red; color: white; border: none; padding: 5px 10px; cursor: pointer">Delete</button>
                    </td>
                </tr>
                <tr v-if="students.length === 0">
                    <td colspan="6" style="text-align: center; color: gray">No Student Available</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '../../axios';
import Swal from 'sweetalert2'
const students = ref([]);
const loading = ref(true);
const message = ref('');

async function fetchStudents() {
    try {
        const res = await api.get('/students');
        students.value = res.data;
    } catch (err) {
        console.error(err);
    } finally {
        loading.value = false;
    }
}

async function deleteStudent(id) {
    const result = await Swal.fire({
        title: 'Are You Sure?',
        text: 'This Action Can Not Be Undo!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, Delete!',
        cancelButtonText: 'Cancel'
    })

    if (result.isConfirmed) {
        await api.delete(`/students/${id}`)

        Swal.fire({
            title: 'Delete Ho Gaya!',
            text: 'Student successfully deleted!',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false
        })

        fetchStudents()
    }
}

onMounted(fetchStudents);
</script>
