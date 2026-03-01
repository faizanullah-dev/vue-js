<template>
    <div style="max-width:500px; margin:40px auto; font-family:sans-serif; padding:0 20px">
        <h1>{{ isEdit ? '✏️ Edit Student' : '➕ Add Student' }}</h1>

        <form @submit.prevent="submitForm">

            <div style="margin-bottom:15px">
                <label>Name:</label>
                <input v-model="form.name" type="text" placeholder="Student naam" style="width:100%; padding:8px; margin-top:5px; box-sizing:border-box">
                <span style="color:red; font-size:13px" v-if="errors.name">{{ errors.name[0] }}</span>
            </div>

            <div style="margin-bottom:15px">
                <label>Email:</label>
                <input v-model="form.email" type="email" placeholder="Email address" style="width:100%; padding:8px; margin-top:5px; box-sizing:border-box">
                <span style="color:red; font-size:13px" v-if="errors.email">{{ errors.email[0] }}</span>
            </div>

            <div style="margin-bottom:15px">
                <label>Phone:</label>
                <input v-model="form.phone" type="text" placeholder="Phone number" style="width:100%; padding:8px; margin-top:5px; box-sizing:border-box">
                <span style="color:red; font-size:13px" v-if="errors.phone">{{ errors.phone[0] }}</span>
            </div>

            <div style="margin-bottom:15px">
                <label>Course:</label>
                <select v-model="form.course" style="width:100%; padding:8px; margin-top:5px">
                    <option value="">-- Select Course --</option>
                    <option v-for="c in courses" :key="c" :value="c">{{ c }}</option>
                </select>
                <span style="color:red; font-size:13px" v-if="errors.course">{{ errors.course[0] }}</span>
            </div>

            <button type="submit" style="background:green; color:white; padding:10px 20px; border:none; border-radius:5px; cursor:pointer">
                {{ isEdit ? 'Update Student' : 'Save Student' }}
            </button>

            <router-link to="/students" style="margin-left:15px; color:gray">
                Cancel
            </router-link>

        </form>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '../../axios'

const route = useRoute()
const router = useRouter()

const isEdit = computed(() => !!route.params.id)
const errors = ref({})
const courses = ['PHP Laravel', 'Vue.js', 'React', 'Node.js', 'Python']

const form = ref({
    name: '',
    email: '',
    phone: '',
    course: ''
})

// Edit mode mein purana data load karo
onMounted(async () => {
    if (isEdit.value) {
        const res = await api.get(`/students/${route.params.id}`)
        form.value = res.data
    }
})

async function submitForm() {
    errors.value = {}
    try {
        if (isEdit.value) {
            await api.put(`/students/${route.params.id}`, form.value)
        } else {
            await api.post('/students', form.value)
        }
        router.push('/students')
    } catch (err) {
        if (err.response?.status === 422) {
            errors.value = err.response.data.errors
        }
    }
}
</script>