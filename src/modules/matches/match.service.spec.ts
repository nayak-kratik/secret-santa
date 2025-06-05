import { MatchService } from './match.service';

describe('MatchService generateMatches', () => {
  let service: MatchService;

  beforeEach(() => {
    service = new MatchService(null as any, null as any, null as any, null as any);
  });

  it('should assign each participant to a unique giftee with no exclusions', () => {
    const participants = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
    const exclusions: any[] = [];

    const assignments = service['generateMatches'](participants, exclusions);
    expect(assignments).not.toBeNull();

    const givers = assignments!.map(([giver]) => giver);
    const receivers = assignments!.map(([, receiver]) => receiver);

    // Each participant is a giver and a receiver exactly once
    expect(new Set(givers).size).toBe(participants.length);
    expect(new Set(receivers).size).toBe(participants.length);

    // No one is assigned to themselves
    assignments!.forEach(([giver, receiver]) => {
      expect(giver).not.toBe(receiver);
    });
  });

  it('should respect exclusion rules', () => {
    const participants = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const exclusions = [{ participant: { id: 1 }, excluded_participant: { id: 2 } }];

    const assignments = service['generateMatches'](participants, exclusions);
    expect(assignments).not.toBeNull();

    expect(assignments).not.toContainEqual([1, 2]);
  });

  it('should return null if no valid assignment is possible', () => {
    const participants = [{ id: 1 }, { id: 2 }];
    const exclusions = [
      { participant: { id: 1 }, excluded_participant: { id: 2 } },
      { participant: { id: 2 }, excluded_participant: { id: 1 } },
    ];

    const assignments = service['generateMatches'](participants, exclusions);

    expect(assignments).toBeNull();
  });

  it('should handle a single participant (should return null)', () => {
    const participants = [{ id: 1 }];
    const exclusions: any[] = [];

    const assignments = service['generateMatches'](participants, exclusions);

    expect(assignments).toBeNull();
  });

  it('should handle circular exclusions and still find a solution', () => {
    const participants = [{ id: 1 }, { id: 2 }, { id: 3 }];
    // 1 can't give to 2, 2 can't give to 3, 3 can't give to 1
    const exclusions = [
      { participant: { id: 1 }, excluded_participant: { id: 2 } },
      { participant: { id: 2 }, excluded_participant: { id: 3 } },
      { participant: { id: 3 }, excluded_participant: { id: 1 } },
    ];

    const assignments = service['generateMatches'](participants, exclusions);

    expect(assignments).not.toBeNull();
    // Check that all exclusions are respected
    assignments!.forEach(([giver, receiver]) => {
      expect(
        !(
          (giver === 1 && receiver === 2) ||
          (giver === 2 && receiver === 3) ||
          (giver === 3 && receiver === 1)
        ),
      ).toBe(true);
    });
  });

  it('should handle all participants excluding themselves', () => {
    const participants = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const exclusions = [
      { participant: { id: 1 }, excluded_participant: { id: 1 } },
      { participant: { id: 2 }, excluded_participant: { id: 2 } },
      { participant: { id: 3 }, excluded_participant: { id: 3 } },
    ];

    const assignments = service['generateMatches'](participants, exclusions);

    expect(assignments).not.toBeNull();
    // No one is assigned to themselves
    assignments!.forEach(([giver, receiver]) => {
      expect(giver).not.toBe(receiver);
    });
  });
});
