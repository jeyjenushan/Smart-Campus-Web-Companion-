import { Camera, Save } from 'lucide-react';

import { Avatar, Button, Input } from '@/components/ui';
import { CustomSelect } from '@/components/ui/Select';

export function ProfileHeaderCard({
  profile,
  editing,
  form,
  setForm,
  saving,
  fileRef,
  handleSave,
  handleAvatarChange,
  cgpa,
}) {
  return (
    <div className="card p-5">
      <div className="flex items-center gap-4">
        <div className="relative">
          <Avatar src={profile.avatar} name={profile.name} size="xl" />

          <button
            onClick={() => fileRef.current?.click()}
            className="absolute -bottom-1 -right-1 w-8 h-8 bg-brand-600 text-white rounded-full flex items-center justify-center shadow-card-md"
            aria-label="Change avatar"
          >
            <Camera className="w-4 h-4" />
          </button>

          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarChange}
          />
        </div>

        <div className="flex-1 min-w-0">
          {editing && form ? (
            <Input
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              placeholder="Full name"
              className="font-bold"
            />
          ) : (
            <>
              <h2 className="text-lg font-bold text-ink">{profile.name}</h2>
              <p className="text-sm text-ink-muted">{profile.degree || 'Not set'}</p>
              <p className="text-xs text-ink-faint">{profile.faculty || 'Not set'}</p>
            </>
          )}
        </div>
      </div>

      {editing && form ? (
        <div className="space-y-3 mt-4">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-muted border border-surface-border">
            <Avatar src={profile.avatar} name={profile.name} size="lg" />

            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-ink">Profile Photo</p>
              <p className="text-xs text-ink-muted truncate">
                {profile.avatar ? 'Tap to change your photo' : 'No photo set — tap to upload'}
              </p>
            </div>

            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => fileRef.current?.click()}
              className="flex-shrink-0 gap-1.5"
            >
              <Camera className="w-3.5 h-3.5" />
              {profile.avatar ? 'Change' : 'Upload'}
            </Button>
          </div>

          <Input
            label="Reg. Number"
            value={form.regNumber}
            onChange={e => setForm(f => ({ ...f, regNumber: e.target.value }))}
          />

          <div className="grid grid-cols-2 gap-3">
            <CustomSelect
              label="Year"
              value={String(form.year)}
              onValueChange={value => setForm(f => ({ ...f, year: value }))}
              options={[1, 2, 3, 4].map(y => ({
                value: String(y),
                label: `Year ${y}`,
              }))}
            />

            <CustomSelect
              label="Semester"
              value={String(form.semester)}
              onValueChange={value => setForm(f => ({ ...f, semester: value }))}
              options={[1, 2].map(s => ({
                value: String(s),
                label: `Sem ${s}`,
              }))}
            />
          </div>

          <Input
            label="GPA"
            type="number"
            step="0.01"
            min="0"
            max="4.0"
            placeholder="3.5"
            value={form.gpa}
            onChange={e => setForm(f => ({ ...f, gpa: e.target.value }))}
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Credits Completed"
              type="number"
              min="0"
              placeholder="0"
              value={form.completedCredits}
              onChange={e => setForm(f => ({ ...f, completedCredits: e.target.value }))}
            />

            <Input
              label="Total Credits"
              type="number"
              min="0"
              placeholder="120"
              value={form.totalCredits}
              onChange={e => setForm(f => ({ ...f, totalCredits: e.target.value }))}
            />
          </div>

          <Input
            label="Faculty"
            type="text"
            placeholder="e.g., Faculty of Science"
            value={form.faculty}
            onChange={e => setForm(f => ({ ...f, faculty: e.target.value }))}
          />

          <Input
            label="Degree"
            type="text"
            placeholder="e.g., BSc Honours in Software Engineering"
            value={form.degree}
            onChange={e => setForm(f => ({ ...f, degree: e.target.value }))}
          />

          <Button
            variant="primary"
            className="w-full"
            loading={saving}
            onClick={handleSave}
          >
            <Save className="w-4 h-4" /> Save Profile
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-surface-border">
          {[
            { label: 'CGPA', value: cgpa },
            { label: 'Current', value: `Y${profile.year}/S${profile.semester}` },
            { label: 'Credits', value: profile.completedCredits },
          ].map(({ label, value }) => (
            <div key={label} className="text-center">
              <p className="text-xl font-bold text-brand-600">{value}</p>
              <p className="text-xs text-ink-muted">{label}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}