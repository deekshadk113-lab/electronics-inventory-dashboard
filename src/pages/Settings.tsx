export default function Settings() {
  return (
    <>
      <div className="animate-fade-in">
        <h1 className="text-2xl font-bold tracking-tight"><span className="text-gradient">Settings</span></h1>
        <p className="text-sm text-muted-foreground">Configure your workspace preferences.</p>
      </div>
      <div className="glass rounded-2xl p-6 space-y-4">
        <Row label="Data Source" value="http://localhost:5000" />
        <Row label="Theme" value="Futuristic Dark" />
        <Row label="Refresh Interval" value="Realtime" />
        <Row label="Notifications" value="Enabled" />
      </div>
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-white/5 pb-3 last:border-0 last:pb-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium">{value}</span>
    </div>
  );
}