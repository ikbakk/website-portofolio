export type SectionId = 'profile' | 'projects' | 'experience' | 'contact';
export function readArchiveLocation(
  hash: string,
  knownIds: readonly string[],
): { section: SectionId; projectId: string } {
  const fallback = knownIds.includes('courtside') ? 'courtside' : (knownIds[0] ?? '');
  const value = hash.replace(/^#/, '');
  if (value.startsWith('project-') && knownIds.includes(value.slice(8)))
    return { section: 'projects', projectId: value.slice(8) };
  return {
    section: (['profile', 'projects', 'experience', 'contact'].includes(value)
      ? value
      : 'profile') as SectionId,
    projectId: fallback,
  };
}
