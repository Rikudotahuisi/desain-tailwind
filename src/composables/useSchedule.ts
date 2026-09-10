import { computed, ref } from "vue";

export function useSchedule() {
    const currentMonth = ref(new Date());
    const selectedDate = ref<Date | null>(new Date());
    const selectedTime = ref<string | null>(null);

    const availableTimes = ref([
        "08:00",
        "08:15",
        "08:30",
        "08:45",
        "09:00",
        "09:15",
        "09:30",
        "09:45",
        "10:00",
        "10:15",
        "10:30",
        "10:45",
        "13:00",
        "13:15",
        "13:30",
        "13:45",
        "14:00",
        "14:15",
        "14:30",
        "14:45",
        "15:00",
        "15:15",
        "15:30",
        "15:45",
        "16:00",
    ]);

    // Nama bulan
    const monthName = computed(() => {
        return currentMonth.value.toLocaleDateString("id-ID", {
            month: "long",
            year: "numeric",
        });
    });

    // Jumlah hari dalam bulan
    const daysInMonth = computed(() => {
        const year = currentMonth.value.getFullYear();
        const month = currentMonth.value.getMonth();

        return new Date(year, month + 1, 0).getDate();
    });

    // Hari pertama dalam bulan
    const firstDayOfMonth = computed(() => {
        const year = currentMonth.value.getFullYear();
        const month = currentMonth.value.getMonth();

        const day = new Date(year, month, 1).getDay();

        // Kalender dimulai dari Senin
        return day === 0 ? 6 : day - 1;
    });

    // Membuat data kalender
    const calendarDays = computed(() => {
        const days: (number | null)[] = [];

        // Tambahkan ruang kosong sebelum tanggal 1
        for (let i = 0; i < firstDayOfMonth.value; i++) {
            days.push(null);
        }

        // Tambahkan tanggal
        for (let day = 1; day <= daysInMonth.value; day++) {
            days.push(day);
        }

        return days;
    });

    // Bulan sebelumnya
    const previousMonth = () => {
        currentMonth.value = new Date(
            currentMonth.value.getFullYear(),
            currentMonth.value.getMonth() - 1,
            1
        );
    };

    // Bulan selanjutnya
    const nextMonth = () => {
        currentMonth.value = new Date(
            currentMonth.value.getFullYear(),
            currentMonth.value.getMonth() + 1,
            1
        );
    };

    // Pilih tanggal
    const selectDate = (day: number) => {
        selectedDate.value = new Date(
            currentMonth.value.getFullYear(),
            currentMonth.value.getMonth(),
            day
        );

        // Reset jam ketika tanggal berubah
        selectedTime.value = null;
    };

    // Pilih jam
    const selectTime = (time: string) => {
        selectedTime.value = time;
    };

    // Mengecek tanggal yang dipilih
    const isSelectedDate = (day: number) => {
        if (!selectedDate.value) {
            return false;
        }

        return (
            selectedDate.value.getDate() === day &&
            selectedDate.value.getMonth() ===
                currentMonth.value.getMonth() &&
            selectedDate.value.getFullYear() ===
                currentMonth.value.getFullYear()
        );
    };

    // Mengecek apakah hari ini
    const isToday = (day: number) => {
        const today = new Date();

        return (
            today.getDate() === day &&
            today.getMonth() === currentMonth.value.getMonth() &&
            today.getFullYear() === currentMonth.value.getFullYear()
        );
    };

    // Format tanggal Indonesia
    const formattedSelectedDate = computed(() => {
        if (!selectedDate.value) {
            return "Pilih tanggal";
        }

        return selectedDate.value.toLocaleDateString("id-ID", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    });

    return {
        currentMonth,
        selectedDate,
        selectedTime,
        availableTimes,
        monthName,
        daysInMonth,
        firstDayOfMonth,
        calendarDays,
        formattedSelectedDate,
        previousMonth,
        nextMonth,
        selectDate,
        selectTime,
        isSelectedDate,
        isToday,
    };
}