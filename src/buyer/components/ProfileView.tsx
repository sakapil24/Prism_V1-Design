import * as React from 'react';
import { Badge, Table, TableHeader, TableBody, TableRow, TableHead, TableCell, Modal, ModalContent, ModalHeader, ModalTitle, ModalDescription, ModalBody, ModalFooter } from '../../design-system/components';
import { Startup, ClaimAudit, Deal } from '../types';

interface StartupProfileModalProps {
  startup: Startup;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function StartupProfileModal({ startup, open, onOpenChange }: StartupProfileModalProps) {
  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent size="md" className="border border-[var(--border-subtle)] rounded-[var(--radius-xl)] bg-white max-w-lg">
        <ModalHeader className="border-b border-[var(--border-subtle)] pb-4">
          <ModalTitle className="text-sm font-bold text-[var(--text-primary)]">
            Startup Profile Metadata
          </ModalTitle>
          <ModalDescription className="text-[14px] text-[var(--text-muted)] mt-0.5">
            Registered venture portfolio details for {startup.name}
          </ModalDescription>
        </ModalHeader>
        
        <ModalBody className="py-5 flex flex-col gap-4 text-[14px]">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1 p-2.5 bg-neutral-50 rounded border border-neutral-100">
              <span className="text-[14px] text-[var(--text-muted)] font-bold">Company Name</span>
              <span className="font-semibold text-neutral-800">{startup.name}</span>
            </div>
            <div className="flex flex-col gap-1 p-2.5 bg-neutral-50 rounded border border-neutral-100">
              <span className="text-[14px] text-[var(--text-muted)] font-bold">VC Portfolio Partner</span>
              <span className="font-semibold text-neutral-800">{startup.vcPartner}</span>
            </div>
            <div className="flex flex-col gap-1 p-2.5 bg-neutral-50 rounded border border-neutral-100">
              <span className="text-[14px] text-[var(--text-muted)] font-bold">Domain URL</span>
              <span className="font-semibold text-neutral-800">{startup.domain}</span>
            </div>
            <div className="flex flex-col gap-1 p-2.5 bg-neutral-50 rounded border border-neutral-100">
              <span className="text-[14px] text-[var(--text-muted)] font-bold">Primary Admin Contact</span>
              <span className="font-semibold text-neutral-800">{startup.contactEmail}</span>
            </div>
            <div className="flex flex-col gap-1 p-2.5 bg-neutral-50 rounded border border-neutral-100">
              <span className="text-[14px] text-[var(--text-muted)] font-bold">Startup Tier</span>
              <span className="font-semibold text-neutral-800">{startup.tier}</span>
            </div>
            <div className="flex flex-col gap-1 p-2.5 bg-neutral-50 rounded border border-neutral-100">
              <span className="text-[14px] text-[var(--text-muted)] font-bold">Active Team Members</span>
              <span className="font-semibold text-neutral-800">{startup.employees} Employees</span>
            </div>
          </div>
        </ModalBody>

        <ModalFooter className="border-t border-[var(--border-subtle)] bg-[var(--surface-secondary)]/30 py-3">
          <button
            onClick={() => onOpenChange(false)}
            className="px-4 py-1.5 bg-black hover:bg-neutral-800 text-white font-bold text-[14px] rounded-[var(--radius-lg)] cursor-pointer transition-colors"
          >
            Close
          </button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

interface RedemptionLedgerModalProps {
  deals: Deal[];
  audits: ClaimAudit[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RedemptionLedgerModal({ deals, audits, open, onOpenChange }: RedemptionLedgerModalProps) {
  const [selectedAuditId, setSelectedAuditId] = React.useState<string | null>(null);

  // Sync audits dynamically
  const syncedAudits = React.useMemo(() => {
    return deals
      .filter(d => d.status !== 'available')
      .map(deal => {
        const existingAudit = audits.find(a => a.dealId === deal.id);
        if (existingAudit) {
          return {
            ...existingAudit,
            status: deal.status,
            auditLogs: [
              ...existingAudit.auditLogs,
              ...(deal.status === 'active' && !existingAudit.auditLogs.some(l => l.action.includes('Active'))
                ? [{ timestamp: new Date().toLocaleDateString(), action: 'Status Updated: Active', note: 'Redemption verified active.' }]
                : deal.status === 'approved' && !existingAudit.auditLogs.some(l => l.action.includes('Approved'))
                ? [{ timestamp: new Date().toLocaleDateString(), action: 'Status Updated: Approved', note: 'Approved by Accel India Relationship Team.' }]
                : [])
            ]
          };
        }

        return {
          id: `audit-${deal.id}`,
          dealId: deal.id,
          dealTitle: deal.title,
          vendorName: deal.vendorName,
          value: deal.value,
          claimCode: deal.claimCode || 'PENDING',
          claimedDate: deal.claimedDate || new Date().toLocaleDateString(),
          status: deal.status,
          auditLogs: [
            {
              timestamp: new Date().toLocaleString(),
              action: 'Claim Submitted',
              note: 'Requested through Portals Benefit system.'
            },
            {
              timestamp: new Date().toLocaleString(),
              action: 'Voucher Generated',
              note: `Code ${deal.claimCode || 'PENDING'} pre-assigned.`
            }
          ]
        };
      });
  }, [deals, audits]);

  const activeAudit = syncedAudits.find(a => a.id === selectedAuditId);

  const getStatusBadgeColor = (status: Deal['status']): "amber" | "blue" | "green" | "gray" => {
    switch (status) {
      case 'claimed': return 'amber';
      case 'approved': return 'amber';
      case 'active': return 'green';
      default: return 'gray';
    }
  };

  const getStatusLabel = (status: Deal['status']): string => {
    switch (status) {
      case 'claimed': return 'Claimed';
      case 'approved': return 'Claimed';
      case 'active': return 'Active';
      default: return 'Available';
    }
  };

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent size="xl" className="border border-[var(--border-subtle)] rounded-[var(--radius-xl)] bg-white max-w-4xl max-h-[85vh] flex flex-col">
        <ModalHeader className="border-b border-[var(--border-subtle)] pb-4 flex-shrink-0">
          <ModalTitle className="text-sm font-bold text-[var(--text-primary)]">
            Redemption Ledger & Audit Log
          </ModalTitle>
          <ModalDescription className="text-[14px] text-[var(--text-muted)] mt-0.5">
            Audit history, claimed vouchers, and active codes for startup benefits.
          </ModalDescription>
        </ModalHeader>

        <ModalBody className="flex-1 overflow-y-auto py-4 flex flex-col lg:flex-row gap-5 min-h-0 text-[14px]">
          {/* Left Panel: Ledger Table */}
          <div className="flex-1 min-w-0">
            <div className="border border-[var(--border-subtle)] rounded-lg overflow-hidden">
              <Table>
                <TableHeader className="bg-neutral-50">
                  <TableRow>
                    <TableHead className="w-[150px] text-[14px] font-bold text-[var(--text-muted)] py-2 px-3">Company</TableHead>
                    <TableHead className="text-[14px] font-bold text-[var(--text-muted)] py-2 px-3">Value</TableHead>
                    <TableHead className="w-[120px] text-[14px] font-bold text-[var(--text-muted)] py-2 px-3">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {syncedAudits.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center py-6 text-[14px] text-[var(--text-muted)]">
                        No vouchers claimed yet.
                      </TableCell>
                    </TableRow>
                  ) : (
                    syncedAudits.map((audit) => (
                      <TableRow
                        key={audit.id}
                        onClick={() => setSelectedAuditId(audit.id)}
                        className={`border-t border-[var(--border-subtle)] transition-colors hover:bg-[var(--surface-hover)] cursor-pointer ${
                          selectedAuditId === audit.id ? 'bg-[var(--surface-secondary)]/50 font-bold' : ''
                        }`}
                      >
                        <TableCell className="py-2.5 px-3 text-[14px] font-bold text-[var(--text-primary)]">
                          {audit.vendorName}
                        </TableCell>
                        <TableCell className="py-2.5 px-3 text-[14px] text-[var(--text-primary)] font-semibold">
                          {audit.value}
                        </TableCell>
                        <TableCell className="py-2.5 px-3 text-[14px]">
                          <Badge color={getStatusBadgeColor(audit.status)} className="h-4 text-[14px] px-1.5">
                            {getStatusLabel(audit.status)}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Right Panel: Audit Logs (Conditional) */}
          <div className="w-full lg:w-72 flex-shrink-0 flex flex-col gap-3 p-3.5 bg-neutral-50 rounded-lg border border-neutral-200/60">
            {activeAudit ? (
              <div className="flex flex-col gap-3.5">
                <div>
                  <h4 className="text-[13px] font-bold text-neutral-500">
                    Redemption Audit Logs
                  </h4>
                  <p className="text-[14px] font-bold text-neutral-900 mt-0.5">
                    {activeAudit.vendorName} — {activeAudit.dealTitle}
                  </p>
                </div>

                <div className="flex flex-col gap-3 relative pl-3.5 before:absolute before:left-1 before:top-1.5 before:bottom-1.5 before:w-[1.5px] before:bg-neutral-200 text-[14px]">
                  {activeAudit.auditLogs.map((log, idx) => (
                    <div key={idx} className="relative flex flex-col gap-0.5">
                      <span className="absolute -left-[18.5px] top-1.5 h-1.5 w-1.5 rounded-full border border-white bg-neutral-600 ring-2 ring-neutral-200" />
                      <div className="flex flex-col">
                        <span className="text-[14px] font-bold text-neutral-800">{log.action}</span>
                        <span className="text-[14px] text-neutral-400 font-mono mt-0.2">{log.timestamp}</span>
                      </div>
                      <p className="text-[14px] text-neutral-500 leading-snug">
                        {log.note}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-center text-neutral-400 text-[14px] py-10">
                Select a voucher from the ledger table to view its audit logs sequence.
              </div>
            )}
          </div>
        </ModalBody>

        <ModalFooter className="border-t border-[var(--border-subtle)] bg-[var(--surface-secondary)]/30 py-3 flex-shrink-0">
          <button
            onClick={() => onOpenChange(false)}
            className="px-4 py-1.5 bg-black hover:bg-neutral-800 text-white font-bold text-[14px] rounded-[var(--radius-lg)] cursor-pointer transition-colors"
          >
            Close
          </button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
