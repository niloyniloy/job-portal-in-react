function MailContactIcon() {
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
			data-lucide="mail"
			className="lucide lucide-mail h-5 w-5 text-[hsl(var(--color-muted-foreground))] flex-shrink-0 mt-0.5"
		>
			<path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
			<rect x={2} y={4} width={20} height={16} rx={2} />
		</svg>
	);
}

export default MailContactIcon;
