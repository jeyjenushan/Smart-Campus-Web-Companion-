import { useState } from 'react';

import { Button, Input, Textarea } from '@/components/ui';
import { CustomSelect } from '@/components/ui/Select';
import { CustomDatePicker } from '@/components/ui/DatePicker';

import { COURSES, PRIORITY_OPTS, TYPE_OPTS } from '@/data/seedData';

export function AssignmentForm({ initial, onSave, onCancel, loading }) {
  const [form, setForm] = useState({
    title: initial?.title ?? '',
    course: initial?.course ?? COURSES[0].code,
    description: initial?.description ?? '',
    dueDate: initial?.dueDate ? initial.dueDate.slice(0, 10) : '',
    priority: initial?.priority ?? 'medium',
    type: initial?.type ?? 'Assignment',
    marks: initial?.marks ?? '',
    status: initial?.status ?? 'pending',
  });

  const [errors, setErrors] = useState({});

  function validate() {
    const nextErrors = {};

    if (!form.title.trim()) nextErrors.title = 'Title is required';
    if (!form.dueDate) nextErrors.dueDate = 'Due date is required';

    if (
      form.marks !== '' &&
      (isNaN(form.marks) || form.marks < 0 || form.marks > 100)
    ) {
      nextErrors.marks = 'Marks must be 0–100';
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  }

  function setField(field, value) {
    setForm(current => ({ ...current, [field]: value }));
    setErrors(current => ({ ...current, [field]: undefined }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!validate()) return;

    onSave({
      ...form,
      marks: form.marks === '' ? null : Number(form.marks),
      dueDate: new Date(`${form.dueDate}T23:59:00`).toISOString(),
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 px-0.5" noValidate>
      <Input
        label="Title *"
        placeholder="e.g. PWA Implementation Report"
        value={form.title}
        onChange={e => setField('title', e.target.value)}
        error={errors.title}
        maxLength={120}
      />

      <CustomSelect
        label="Course *"
        value={form.course}
        onValueChange={value => setField('course', value)}
        options={COURSES.map(course => ({
          value: course.code,
          label: `${course.code} – ${course.name}`,
        }))}
      />

      <div className="grid grid-cols-2 gap-3">
        <CustomSelect
          label="Priority"
          value={form.priority}
          onValueChange={value => setField('priority', value)}
          options={PRIORITY_OPTS}
        />

        <CustomSelect
          label="Type"
          value={form.type}
          onValueChange={value => setField('type', value)}
          options={TYPE_OPTS}
        />
      </div>

      <div className="grid grid-cols-2 gap-3 items-end">
        <CustomDatePicker
          label="Due Date *"
          value={form.dueDate}
          onChange={value => setField('dueDate', value)}
          error={errors.dueDate}
          min={new Date().toISOString().slice(0, 10)}
        />

        <Input
          label="Marks (%)"
          type="number"
          min={0}
          max={100}
          placeholder="25"
          value={form.marks}
          onChange={e => setField('marks', e.target.value)}
          error={errors.marks}
        />
      </div>

      {initial && (
        <CustomSelect
          label="Status"
          value={form.status}
          onValueChange={value => setField('status', value)}
          options={[
            { value: 'pending', label: '⏳ Pending' },
            { value: 'in-progress', label: '🔄 In Progress' },
            { value: 'completed', label: '✅ Completed' },
          ]}
        />
      )}

      <Textarea
        label="Description"
        placeholder="Assignment details, instructions…"
        value={form.description}
        onChange={e => setField('description', e.target.value)}
        rows={3}
      />

      <div className="flex gap-3 pt-2">
        <Button
          type="button"
          variant="secondary"
          className="flex-1"
          onClick={onCancel}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          variant="primary"
          className="flex-1"
          loading={loading}
        >
          {initial ? 'Save Changes' : 'Add Assignment'}
        </Button>
      </div>
    </form>
  );
}