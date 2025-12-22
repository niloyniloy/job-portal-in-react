import XIcon from './../icons/XIcon' 
import SendIcon from './../icons/SendIcon'

function ApplyJob({ setCoverMessage, errorMsg, coverMessage, setRenderModal, submitApplyJob, setErrorMsg  }) {

	const MAX_CHARS = 500;

	return (
		<div
			id="applyDialog"
			className=" fixed inset-0 bg-black/50 z-50 items-center justify-center p-4"
			style={{ display: "flex" }}
		>
			<div className="card max-w-2xl w-full max-h-[90vh] overflow-y-auto">
				<div className="p-6 space-y-6">
					{/* Dialog Header */}
					<div className="flex items-start justify-between">
						<div>
							<h2 className="text-2xl font-semibold">Apply for Position</h2>
							<p className="text-sm text-[hsl(var(--color-muted-foreground))] mt-1">
								Complete the form below to submit your application
							</p>
							<p style={{ color: 'red' }}>{errorMsg}</p>
						</div>
						<button onClick={() => setRenderModal(false)} className="btn-ghost p-2">
							<XIcon />
						</button>
					</div>

					{/* Cover Message Section */}
					<div className="space-y-3">
						<label htmlFor="coverMessage" className="text-sm font-medium">
							Cover Message
							<span className="text-red-500"> *</span>
						</label>
						<textarea
							id="coverMessage"
							rows={10}
							className="textarea resize-none"
							placeholder="Write a brief message about why you're a great fit for this role..."
							value={coverMessage}
							onChange={(e) => {
								setErrorMsg("");
								setCoverMessage(e.target.value.slice(0, MAX_CHARS));
							}}
						/>
						<p className="text-xs text-[hsl(var(--color-muted-foreground))]">
							<span id="charCount"> {coverMessage.length}</span>/{MAX_CHARS} characters
						</p>
					</div>
					{/* Action Buttons */}
					<div className="flex gap-3 pt-4 border-t border-[hsl(var(--color-border))]">
						<button
							onClick={() => setRenderModal(false)}
							className="btn btn-outline flex-1"
						>
							Cancel
						</button>
						<button
							onClick={() => submitApplyJob()}
							className="btn btn-primary flex-1"

						>
							<SendIcon />
							Submit Application
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ApplyJob