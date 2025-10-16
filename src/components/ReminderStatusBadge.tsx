interface Props {
    active: boolean;
}

export default function RenderStatusBadge({active}: Props) {
    return (
        <span className={`inline-flex px-2 text-xs font-semibold leading-5 rounded-full ${active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {active ? 'Active' : 'Inactive'}
        </span>
    );
}