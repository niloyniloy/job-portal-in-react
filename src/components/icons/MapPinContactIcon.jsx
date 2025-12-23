function MapPinContactIcon() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={24}
			height={24}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth={2}
			strokeLinecap="round"
			strokeLinejoin="round"
			data-lucide="map-pin"
			className="lucide lucide-map-pin h-5 w-5 text-[hsl(var(--color-muted-foreground))] flex-shrink-0 mt-0.5"
		>
			<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
			<circle cx={12} cy={10} r={3} />
		</svg>
	);
}

export default MapPinContactIcon;
