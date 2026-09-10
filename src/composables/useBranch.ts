import { computed, ref } from "vue";

export interface Branch {
    id: number;
    name: string;
    city: string;
    address: string;
    phone: string;
    status: "Aktif" | "Nonaktif";
}

const branches = ref<Branch[]>([
    {
        id: 1,
        name: "Assyifa Hospital Palu",
        city: "Palu",
        address: "Jl. Jenderal Sudirman No. 10",
        phone: "0451-123456",
        status: "Aktif",
    },
    {
        id: 2,
        name: "Assyifa Hospital Makassar",
        city: "Makassar",
        address: "Jl. Sultan Hasanuddin No. 25",
        phone: "0411-123456",
        status: "Aktif",
    },
    {
        id: 3,
        name: "Assyifa Hospital Jakarta",
        city: "Jakarta",
        address: "Jl. Sudirman No. 50",
        phone: "021-123456",
        status: "Aktif",
    },
]);

export function useBranch() {
    const search = ref("");

    const filteredBranches = computed(() => {
        const keyword = search.value.toLowerCase();

        return branches.value.filter((branch) => {
            return (
                branch.name.toLowerCase().includes(keyword) ||
                branch.city.toLowerCase().includes(keyword)
            );
        });
    });

    const addBranch = (branch: Omit<Branch, "id">) => {
        branches.value.unshift({
            id: Date.now(),
            ...branch,
        });
    };

    const updateBranch = (
        id: number,
        updatedBranch: Omit<Branch, "id">
    ) => {
        const index = branches.value.findIndex(
            (branch) => branch.id === id
        );

        if (index !== -1) {
            branches.value[index] = {
                id,
                ...updatedBranch,
            };
        }
    };

    const deleteBranch = (id: number) => {
        branches.value = branches.value.filter(
            (branch) => branch.id !== id
        );
    };

    return {
        branches,
        search,
        filteredBranches,
        addBranch,
        updateBranch,
        deleteBranch,
    };
}