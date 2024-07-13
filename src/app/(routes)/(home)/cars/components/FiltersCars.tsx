import React from 'react'
import { SelectContent, Select, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Trash } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface FiltersCarsProps {
    setFilters: (filterName: string, filterValue: string) => void
    clearFilters: () => void
    filters: {
        type: string
        transmission: string
        engine: string
        people: string
    }
}

export default function FiltersCars(props: FiltersCarsProps) {

    const { setFilters, clearFilters, filters } = props

    const handleFilter = (filterName: string, filterValue: string) => {

        setFilters(filterName, filterValue)
    }

    return (
        <div className='nt-5 mb-8 flex flex-col gap-5 space-y-4 md:flex-row md:space-y-0 md:gap-5'>
            <Select onValueChange={(value) => handleFilter('type', value)} value={filters.type}>
                <SelectTrigger>
                    <SelectValue placeholder="Tipo de coche" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Tipo de coche</SelectLabel>
                        <SelectItem value="Sedan">Sedan</SelectItem>
                        <SelectItem value="suv">Suv</SelectItem>
                        <SelectItem value="coupe">Coupe</SelectItem>
                        <SelectItem value="familiar">Familiar</SelectItem>
                        <SelectItem value="luxe">De luxe</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
            <Select onValueChange={(value) => handleFilter('transmission', value)} value={filters.transmission}>
                <SelectTrigger>
                    <SelectValue placeholder="Cambio de marchas" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Cambio de marchas</SelectLabel>
                        <SelectItem value="automatic">Automatico</SelectItem>
                        <SelectItem value="manual">Manual</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
            <Select onValueChange={(value) => handleFilter('engine', value)} value={filters.engine}>
                <SelectTrigger>
                    <SelectValue placeholder="Tipo de moton" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Tipo de motor</SelectLabel>
                        <SelectItem value="gasoil">Gasoil</SelectItem>
                        <SelectItem value="electric">Electric</SelectItem>
                        <SelectItem value="diesel">Disel</SelectItem>
                        <SelectItem value="hybrid">Hibrido</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
            <Select onValueChange={(value) => handleFilter('people', value)} value={filters.people}>
                <SelectTrigger>
                    <SelectValue placeholder="Personas" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Personas</SelectLabel>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="4">4</SelectItem>
                        <SelectItem value="5">5</SelectItem>
                        <SelectItem value="7">7</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>

            <Button onClick={clearFilters}>
                Quitar filtros
                <Trash className='w-4 h-4 ml-2' />
            </Button>
        </div>
    )
}
