import { Skeleton as SkeletonPrimitive } from "@/components/ui/skeleton"

export default function Skeleton() {

    const numbersItems = 8

    return (
        <div className="grid md:grid-cols-2 gap-6 lg:grid-cols-4">
            {[...Array(numbersItems)].map((_, index) => (
                <div>
                    <SkeletonPrimitive key={index} className="h-[200px] w-full rounded-xl" />
                    <SkeletonPrimitive key={index} className="h-4 w-[200px] mt-5 " />
                    <SkeletonPrimitive key={index} className="h-4 w-[200px] mt-5 " />
                    <SkeletonPrimitive key={index} className="h-4 w-[200px] mt-5 " />
                </div>
            ))}
        </div>
    )
}
