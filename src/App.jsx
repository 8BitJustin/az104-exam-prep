import { useState, useEffect } from "react";

// ─── QUESTION BANK ────────────────────────────────────────────────────────────
const questionBank = [
  // ── DOMAIN 1: Identities & Governance (20–25%) ──
  {
    domain: "Manage Azure Identities & Governance",
    domainId: 1,
    color: "#00B4D8",
    icon: "🪪",
    questions: [
      {
        id: "1a",
        q: "A user was deleted from Microsoft Entra ID 20 days ago. A manager requests the account be restored. What should you do?",
        options: [
          "Restore the user from the Deleted Users blade in Entra ID",
          "Re-create the user manually with the same UPN",
          "Open a Microsoft support ticket to recover the account",
          "The account cannot be recovered after deletion",
        ],
        answer: 0,
        explanation:
          "Deleted users remain in a soft-deleted state for 30 days in Entra ID and can be restored from the Deleted Users blade. After 30 days they are permanently purged and cannot be recovered.",
      },
      {
        id: "1b",
        q: "You need to ensure that only users in the 'Engineering' department are automatically added to a security group. Which group type and membership should you use?",
        options: [
          "Microsoft 365 group with Assigned membership",
          "Security group with Dynamic User membership",
          "Security group with Assigned membership",
          "Distribution group with Dynamic Device membership",
        ],
        answer: 1,
        explanation:
          "Dynamic User membership on a Security group uses rules (e.g., user.department -eq 'Engineering') to automatically add/remove members. This requires Entra ID P1 or P2 licensing.",
      },
      {
        id: "1c",
        q: "You assign the Contributor role to a user at the Resource Group scope. What can this user do?",
        options: [
          "Manage all resources in the resource group but cannot manage access",
          "Read all resources across the entire subscription",
          "Create and delete resources anywhere in the subscription",
          "Manage access and resources within the resource group",
        ],
        answer: 0,
        explanation:
          "Contributor grants full access to manage resources but does NOT allow managing role assignments (access). Owner is needed to manage access. RBAC at the Resource Group scope applies only within that group.",
      },
      {
        id: "1d",
        q: "An Azure Policy with the 'Deny' effect is assigned to a subscription. A user tries to create a non-compliant resource. What happens?",
        options: [
          "The resource is created but flagged as non-compliant",
          "The resource creation is blocked immediately",
          "An alert is triggered but creation is allowed",
          "The resource is quarantined for 24 hours then deleted",
        ],
        answer: 1,
        explanation:
          "The Deny effect prevents the request from completing. The resource is not created. This is different from Audit (logs non-compliance but allows creation) and DeployIfNotExists (deploys a remediation resource).",
      },
      {
        id: "1e",
        q: "You place a ReadOnly lock on a resource group containing a storage account. What is the effect?",
        options: [
          "No one can read or write to the storage account",
          "Users can read but cannot create, update, or delete resources",
          "Only administrators can modify resources",
          "The lock applies to future resources but not existing ones",
        ],
        answer: 1,
        explanation:
          "A ReadOnly lock prevents create, update, and delete operations. Read operations still work. Even subscription Owners cannot modify locked resources without first removing the lock.",
      },
      {
        id: "1f",
        q: "What is the maximum number of days a soft-deleted user can be restored in Microsoft Entra ID?",
        options: ["7 days", "14 days", "30 days", "90 days"],
        answer: 2,
        explanation:
          "Entra ID retains soft-deleted users for exactly 30 days. During this window, the account — including its group memberships and properties — can be fully restored.",
      },
      {
        id: "1g",
        q: "You need to allow a team member to view resources in a subscription but not make any changes. Which built-in RBAC role should you assign?",
        options: ["Contributor", "Owner", "Reader", "User Access Administrator"],
        answer: 2,
        explanation:
          "Reader grants read-only access across all resource types within the assigned scope. Contributor adds write/delete. Owner adds access management. User Access Administrator manages role assignments specifically.",
      },
      {
        id: "1h",
        q: "Which Azure Policy effect should you use if you want to log non-compliant resources without blocking their creation?",
        options: ["Deny", "Append", "Audit", "Modify"],
        answer: 2,
        explanation:
          "Audit evaluates resources and logs non-compliance to the Activity Log without preventing the operation. Use Deny to block, DeployIfNotExists to auto-remediate, and Append to add fields to requests.",
      },
      {
        id: "1i",
        q: "A resource tag strategy is required for all new resources. You want to automatically add a missing 'CostCenter' tag without blocking deployments. Which policy effect is best?",
        options: ["Deny", "Audit", "Append", "Modify"],
        answer: 3,
        explanation:
          "Modify is used to add, update, or remove properties (including tags) on resources during create or update operations. Append adds fields to the request payload but Modify is the correct effect specifically for tags on existing and new resources.",
      },
      {
        id: "1j",
        q: "VNet A is peered with VNet B. VNet B is peered with VNet C. Can a VM in VNet A communicate with a VM in VNet C by default?",
        options: [
          "Yes, peering is transitive by default",
          "No, VNet peering is not transitive",
          "Yes, if both peerings have 'Allow forwarded traffic' enabled",
          "Only if VNet B has IP forwarding enabled on its NIC",
        ],
        answer: 1,
        explanation:
          "VNet peering is NOT transitive. A↔B and B↔C does not give A↔C connectivity. To route between non-peered VNets you need a hub-spoke topology with Azure Firewall or a Network Virtual Appliance, or direct A↔C peering.",
      },
    ],
  },

  // ── DOMAIN 2: Storage (15–20%) ──
  {
    domain: "Implement & Manage Storage",
    domainId: 2,
    color: "#06D6A0",
    icon: "💾",
    questions: [
      {
        id: "2a",
        q: "You need storage that replicates data synchronously across three availability zones in the same region. Which redundancy option should you choose?",
        options: [
          "Locally Redundant Storage (LRS)",
          "Geo-Redundant Storage (GRS)",
          "Zone-Redundant Storage (ZRS)",
          "Geo-Zone-Redundant Storage (GZRS)",
        ],
        answer: 2,
        explanation:
          "ZRS synchronously replicates data across 3 availability zones within one region, providing 99.9999999999% (12 9s) durability. LRS keeps 3 copies in one datacenter. GRS replicates to a secondary region. GZRS combines zone and geo redundancy.",
      },
      {
        id: "2b",
        q: "A blob has not been accessed in 90 days. You want it to automatically move to Archive tier. What should you configure?",
        options: [
          "Immutability policy",
          "Lifecycle management policy",
          "SAS token with expiry",
          "Object replication policy",
        ],
        answer: 1,
        explanation:
          "Blob lifecycle management policies define rules to automatically transition blobs between access tiers (Hot→Cool→Archive) or delete them based on age or last-modified/last-accessed conditions.",
      },
      {
        id: "2c",
        q: "You need to grant a vendor time-limited read access to a specific blob container without sharing your account key. What is the best approach?",
        options: [
          "Create a new storage account for the vendor",
          "Add the vendor as a Contributor on the storage account",
          "Generate a Shared Access Signature (SAS) token",
          "Enable anonymous public access on the container",
        ],
        answer: 2,
        explanation:
          "A SAS token provides delegated, time-limited access to specific resources with defined permissions. It avoids sharing account keys and can be revoked by rotating the key it was signed with. Anonymous access is too broad and has no expiry.",
      },
      {
        id: "2d",
        q: "What is the difference between RA-GRS and GRS storage redundancy?",
        options: [
          "RA-GRS replicates to 3 regions; GRS replicates to 2",
          "RA-GRS allows read access from the secondary region; GRS does not",
          "RA-GRS uses synchronous replication; GRS uses asynchronous",
          "There is no difference — they are the same SKU",
        ],
        answer: 1,
        explanation:
          "Both GRS and RA-GRS replicate asynchronously to a paired secondary region. The key difference: RA-GRS (Read-Access GRS) allows read operations from the secondary endpoint at all times. GRS only allows failover to the secondary during a regional outage.",
      },
      {
        id: "2e",
        q: "A company needs to prevent blobs from being deleted or modified for regulatory compliance for 7 years. What should you configure?",
        options: [
          "Soft delete with 7-year retention",
          "Lifecycle management policy",
          "WORM immutability policy (time-based retention)",
          "Azure Backup for blob storage",
        ],
        answer: 2,
        explanation:
          "WORM (Write Once Read Many) immutability policies enforce that blobs cannot be modified or deleted for the specified retention period. This is the correct solution for regulatory compliance (SEC 17a-4, FINRA, etc.).",
      },
      {
        id: "2f",
        q: "You want to mount an Azure storage share on an on-premises Windows server and sync files bidirectionally. Which service supports this?",
        options: [
          "Azure Blob Storage with NFS",
          "Azure File Sync",
          "Azure Data Box",
          "Azure Import/Export service",
        ],
        answer: 1,
        explanation:
          "Azure File Sync extends on-premises Windows Server file shares to Azure. It enables bidirectional sync, cloud tiering (less-used files stored only in Azure), and multi-site sync across multiple servers.",
      },
      {
        id: "2g",
        q: "Which blob type is optimized for append operations, such as logging?",
        options: ["Block blob", "Page blob", "Append blob", "Archive blob"],
        answer: 2,
        explanation:
          "Append blobs are optimized for append operations. Data can only be added to the end of the blob, making them ideal for logging scenarios. Block blobs are general-purpose. Page blobs are used for VHD/disk files.",
      },
      {
        id: "2h",
        q: "You need to restrict access to a storage account so only resources within a specific VNet subnet can connect. What should you configure?",
        options: [
          "Shared Access Signature with IP restriction",
          "Storage account firewall with a VNet service endpoint",
          "Private Link for the storage account",
          "NSG on the storage account",
        ],
        answer: 1,
        explanation:
          "Configuring a VNet service endpoint on the subnet and adding that subnet to the storage account firewall restricts access to traffic from that subnet. Private Link is more secure (private IP) but more complex. NSGs don't apply directly to storage accounts.",
      },
    ],
  },

  // ── DOMAIN 3: Compute (20–25%) ──
  {
    domain: "Deploy & Manage Azure Compute",
    domainId: 3,
    color: "#FFB703",
    icon: "⚙️",
    questions: [
      {
        id: "3a",
        q: "You need to resize a running Azure VM. What must you do first?",
        options: [
          "Create a VM snapshot before resizing",
          "Deallocate the VM, then resize",
          "Resize is applied live with no downtime",
          "Delete and redeploy the VM with the new size",
        ],
        answer: 1,
        explanation:
          "To resize a VM to a size in a different cluster, you must first deallocate it. This releases the hardware and allows Azure to place it on a host that supports the new size. Some same-family resizes can happen without deallocation but it's not guaranteed.",
      },
      {
        id: "3b",
        q: "What is the key difference between an Availability Set and an Availability Zone?",
        options: [
          "Availability Sets span multiple regions; Availability Zones do not",
          "Availability Sets distribute VMs across fault/update domains in one datacenter; Zones are physically separate datacenters",
          "Availability Zones are free; Availability Sets cost extra",
          "Availability Sets require a load balancer; Zones do not",
        ],
        answer: 1,
        explanation:
          "Availability Sets protect against rack-level failures within a single datacenter using fault domains and update domains. Availability Zones are physically separate datacenters within a region, protecting against full datacenter failure. Zones offer higher SLA (99.99% vs 99.95%).",
      },
      {
        id: "3c",
        q: "You deploy a web app to a staging deployment slot and want to push it to production. What operation should you perform?",
        options: [
          "Delete the production slot and rename staging",
          "Use the Swap operation between staging and production slots",
          "Copy the app files from staging to production manually",
          "Restart the production slot to pick up the staging configuration",
        ],
        answer: 1,
        explanation:
          "Slot swap exchanges the content and configuration between two slots with zero downtime. Slot-specific settings (like connection strings marked as 'slot setting') stay with their slot; non-slot settings travel with the app on swap.",
      },
      {
        id: "3d",
        q: "Which Azure service lets you run a containerized application without managing any underlying VMs or clusters?",
        options: [
          "Azure Kubernetes Service (AKS)",
          "Azure Virtual Machine Scale Sets",
          "Azure Container Instances (ACI)",
          "Azure App Service (Docker)",
        ],
        answer: 2,
        explanation:
          "Azure Container Instances (ACI) is a serverless container service — you specify the image and resources, and Azure runs it with no VM or cluster to manage. AKS is a managed Kubernetes service that still requires node pools.",
      },
      {
        id: "3e",
        q: "What is the difference between Azure Backup and Azure Site Recovery?",
        options: [
          "Backup is for VMs only; Site Recovery supports databases too",
          "Backup protects against data loss; Site Recovery enables disaster recovery failover to another region",
          "They are the same service with different pricing tiers",
          "Site Recovery creates daily snapshots; Backup does continuous replication",
        ],
        answer: 1,
        explanation:
          "Azure Backup protects against data loss by creating recovery points you can restore from. Azure Site Recovery (ASR) is a DR solution that continuously replicates VMs to a secondary region, enabling failover if the primary region fails.",
      },
      {
        id: "3f",
        q: "A VM Scale Set is configured to scale out when CPU > 70% for 5 minutes. CPU spikes to 85% for 3 minutes then drops to 60%. What happens?",
        options: [
          "A new instance is added immediately",
          "No new instance is added — the threshold wasn't sustained long enough",
          "An alert fires but no scaling occurs",
          "The scale set reduces instance count due to the drop",
        ],
        answer: 1,
        explanation:
          "Autoscale rules require the metric condition to be sustained for the full evaluation window (5 minutes in this case). A 3-minute spike does not trigger scale-out. This cooldown/window behavior prevents thrashing.",
      },
      {
        id: "3g",
        q: "Which App Service plan tier is required to use deployment slots?",
        options: ["Free (F1)", "Shared (D1)", "Basic (B1)", "Standard (S1) or higher"],
        answer: 3,
        explanation:
          "Deployment slots are available starting at Standard (S1) tier and above. Free and Shared tiers don't support slots. Basic supports custom domains/SSL but not slots. Standard is the minimum for slots, autoscale, and Traffic Manager integration.",
      },
      {
        id: "3h",
        q: "You need to run a background job in Azure that executes on a schedule without managing servers. Which service is most appropriate?",
        options: [
          "Azure Virtual Machine with Task Scheduler",
          "Azure Functions with a Timer trigger",
          "Azure Container Instances with a restart policy",
          "Azure App Service WebJobs on Free tier",
        ],
        answer: 1,
        explanation:
          "Azure Functions with a Timer trigger provides serverless, schedule-based execution using cron expressions. You pay only for execution time. No VMs or servers to manage. WebJobs work but require an App Service Plan running continuously.",
      },
    ],
  },

  // ── DOMAIN 4: Virtual Networking (25–30%) ──
  {
    domain: "Configure & Manage Virtual Networking",
    domainId: 4,
    color: "#E040FB",
    icon: "🌐",
    questions: [
      {
        id: "4a",
        q: "An NSG rule has priority 100 to Allow HTTP (port 80) and priority 200 to Deny HTTP (port 80). What is the result for HTTP traffic?",
        options: [
          "Traffic is denied because Deny overrides Allow",
          "Traffic is allowed because the lower priority number is evaluated first",
          "Both rules cancel each other and traffic is blocked",
          "The most recently created rule takes precedence",
        ],
        answer: 1,
        explanation:
          "NSG rules are evaluated in priority order — lower number = higher priority. Priority 100 (Allow) is evaluated before priority 200 (Deny). Once a rule matches, processing stops. So HTTP traffic is allowed.",
      },
      {
        id: "4b",
        q: "You need VMs in two VNets in different regions to communicate. What should you configure?",
        options: [
          "VNet-to-VNet VPN Gateway connection",
          "Global VNet Peering",
          "Express Route with Microsoft Peering",
          "Service Endpoints between the VNets",
        ],
        answer: 1,
        explanation:
          "Global VNet Peering extends VNet peering across Azure regions using Microsoft's backbone network. It's lower cost and lower latency than VPN Gateways for VNet-to-VNet connectivity. Service Endpoints don't connect VNets.",
      },
      {
        id: "4c",
        q: "You create a Private DNS Zone 'internal.contoso.com' and link it to a VNet with auto-registration enabled. A new VM named 'webvm' is deployed to that VNet. What record is automatically created?",
        options: [
          "A CNAME record pointing webvm to its public IP",
          "An A record mapping webvm.internal.contoso.com to the VM's private IP",
          "An MX record for mail delivery to webvm",
          "No record is created — auto-registration requires manual trigger",
        ],
        answer: 1,
        explanation:
          "When auto-registration is enabled on a VNet link, Azure automatically creates A records for VMs deployed in that VNet, mapping hostname.zone to the VM's private IP. This eliminates manual DNS record management.",
      },
      {
        id: "4d",
        q: "What does Azure Application Gateway provide that a Standard Load Balancer does not?",
        options: [
          "Support for TCP and UDP traffic",
          "Layer 7 routing, SSL termination, and WAF capabilities",
          "Availability Zone support",
          "Backend health probes",
        ],
        answer: 1,
        explanation:
          "Application Gateway operates at Layer 7 (HTTP/HTTPS) and supports URL path-based routing, cookie-based session affinity, SSL/TLS termination, and an optional Web Application Firewall (WAF). Standard Load Balancer is Layer 4 (TCP/UDP) only.",
      },
      {
        id: "4e",
        q: "Which tool in Network Watcher tells you whether an NSG rule is blocking traffic between two specific IP addresses?",
        options: [
          "Connection Monitor",
          "Next Hop",
          "IP Flow Verify",
          "NSG Flow Logs",
        ],
        answer: 2,
        explanation:
          "IP Flow Verify tests whether traffic is allowed or denied for a specific direction, protocol, local/remote IP, and port — and identifies which NSG rule is making that decision. Next Hop shows routing path. Flow Logs capture actual traffic data.",
      },
      {
        id: "4f",
        q: "What is the default outbound port for HTTPS, and which NSG default rule allows outbound internet traffic?",
        options: [
          "Port 443; AllowInternetOutBound (priority 65001)",
          "Port 443; AllowVnetOutBound (priority 65000)",
          "Port 8443; AllowInternetOutBound (priority 65001)",
          "Port 443; there is no default outbound allow rule",
        ],
        answer: 0,
        explanation:
          "HTTPS uses port 443. NSGs have a default outbound rule 'AllowInternetOutBound' at priority 65001 that permits all outbound traffic to the internet. 'AllowVnetOutBound' at 65000 allows intra-VNet traffic. 'DenyAllOutBound' at 65500 blocks everything else.",
      },
      {
        id: "4g",
        q: "You need to prevent all internet outbound traffic from a subnet while still allowing traffic to Azure Storage. What combination should you use?",
        options: [
          "NSG deny rule + VNet service endpoint for Storage",
          "Route table with default route to a firewall + storage service endpoint",
          "Azure Firewall only",
          "NSG deny rule + Private Endpoint for Storage",
        ],
        answer: 0,
        explanation:
          "An NSG outbound Deny rule for the Internet service tag blocks internet traffic. A service endpoint for Azure Storage on the subnet allows traffic to storage over the Microsoft backbone, bypassing the internet entirely.",
      },
      {
        id: "4h",
        q: "What is the minimum subnet size required for an Azure VPN Gateway subnet?",
        options: ["/29", "/28", "/27", "/26"],
        answer: 2,
        explanation:
          "Microsoft recommends a /27 (32 addresses) or larger for the GatewaySubnet to accommodate future gateway additions and VPN/ExpressRoute coexistence. A /29 is the absolute minimum but is not recommended for production.",
      },
      {
        id: "4i",
        q: "A VM in a VNet cannot reach the internet despite having a public IP. The NSG shows no deny rules. What should you check next?",
        options: [
          "Verify the VM's OS firewall isn't blocking outbound traffic",
          "Check if a User Defined Route (UDR) is sending traffic to a next hop that doesn't route to internet",
          "Confirm the VM has a DNS server configured",
          "Check if the storage account has a firewall enabled",
        ],
        answer: 1,
        explanation:
          "A User Defined Route (UDR) with a 0.0.0.0/0 next hop pointing to a virtual appliance or 'None' overrides the default system route to the internet. Even with a public IP and no NSG blocks, a UDR can black-hole outbound traffic.",
      },
    ],
  },

  // ── DOMAIN 5: Monitor & Maintain (10–15%) ──
  {
    domain: "Monitor & Maintain Azure Resources",
    domainId: 5,
    color: "#FF6B6B",
    icon: "📊",
    questions: [
      {
        id: "5a",
        q: "You want to receive an email when a VM's CPU exceeds 80% for more than 5 minutes. What two things must you configure?",
        options: [
          "A diagnostic setting and a Log Analytics query",
          "An alert rule with a metric condition and an action group with email",
          "A workbook and a scheduled export",
          "Azure Security Center and email notification",
        ],
        answer: 1,
        explanation:
          "Alert rules define the condition (metric: CPU > 80%, evaluation window: 5 min). Action groups define what happens when the alert fires (email, SMS, webhook, ITSM, etc.). Both are required — the alert detects, the action group notifies.",
      },
      {
        id: "5b",
        q: "Which KQL operator would you use to filter a Log Analytics query to only show events from the last 24 hours?",
        options: [
          "| where TimeGenerated > now() - 24h",
          "| filter time > -24h",
          "| select TimeGenerated last 24h",
          "| top 24 by TimeGenerated",
        ],
        answer: 0,
        explanation:
          "In KQL, 'where TimeGenerated > now() - 24h' correctly filters results to the past 24 hours. KQL uses pipe-based syntax. 'filter' is not a valid KQL operator. 'select' and 'top' serve different purposes.",
      },
      {
        id: "5c",
        q: "What is the purpose of an Azure Monitor Action Group?",
        options: [
          "To define the metric thresholds that trigger an alert",
          "To define the notification and automation actions taken when an alert fires",
          "To group related Azure resources for monitoring",
          "To collect logs from multiple resources into one workspace",
        ],
        answer: 1,
        explanation:
          "Action groups contain one or more actions (email, SMS, voice, webhook, Azure Function, Logic App, ITSM) that execute when associated alert rules fire. Multiple alert rules can share a single action group.",
      },
      {
        id: "5d",
        q: "You need to query logs from multiple Azure resources in one place. What should you deploy first?",
        options: [
          "Azure Monitor Metrics Dashboard",
          "Application Insights component",
          "Log Analytics Workspace",
          "Azure Data Explorer cluster",
        ],
        answer: 2,
        explanation:
          "A Log Analytics Workspace is the central repository for log data. Resources (VMs, NSGs, Activity Log, etc.) send diagnostic data to the workspace, where you query it using KQL. Application Insights is built on top of Log Analytics but is scoped to application telemetry.",
      },
      {
        id: "5e",
        q: "IP Flow Verify in Network Watcher reports that traffic is 'Denied' by a rule. Where does this rule exist?",
        options: [
          "In the Azure Firewall policy",
          "In an NSG associated with the NIC or subnet",
          "In the route table attached to the subnet",
          "In the VNet's DDoS protection plan",
        ],
        answer: 1,
        explanation:
          "IP Flow Verify checks NSG rules on the VM's NIC and its associated subnet to determine if traffic is allowed or denied. It identifies the specific NSG and rule name responsible. Route tables affect routing, not allow/deny decisions.",
      },
      {
        id: "5f",
        q: "What does the Azure Monitor 'Heartbeat' table in Log Analytics indicate?",
        options: [
          "The CPU heartbeat of a VM at regular intervals",
          "That the Azure Monitor Agent on a VM is running and communicating with the workspace",
          "Inbound network pulses to detect DDoS activity",
          "Storage account health check responses",
        ],
        answer: 1,
        explanation:
          "The Heartbeat table receives records every minute from VMs with the Azure Monitor Agent (or legacy MMA). Absence of heartbeats indicates the agent is down or the VM is offline. It's commonly used to monitor VM availability.",
      },
      {
        id: "5g",
        q: "Which Azure service provides detailed flow logs showing which IP addresses and ports are communicating through an NSG?",
        options: [
          "Azure Monitor Metrics",
          "Network Watcher NSG Flow Logs",
          "IP Flow Verify",
          "Azure Traffic Analytics",
        ],
        answer: 1,
        explanation:
          "NSG Flow Logs capture information about IP traffic flowing through NSGs, including source/destination IP, port, protocol, and whether the traffic was allowed or denied. They are stored in a storage account and can be analyzed with Traffic Analytics.",
      },
      {
        id: "5h",
        q: "You want to visualize data from multiple Log Analytics queries in a single view that can be shared with your team. What should you create?",
        options: [
          "An Azure Dashboard with metric tiles",
          "A Log Analytics saved search",
          "An Azure Monitor Workbook",
          "An Application Insights availability test",
        ],
        answer: 2,
        explanation:
          "Azure Monitor Workbooks provide rich, interactive reports combining text, KQL queries, metrics, and parameters into a shareable document. Dashboards are simpler pinned tiles. Workbooks are better for detailed, multi-section operational reports.",
      },
    ],
  },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickQuestions() {
  return questionBank.flatMap((domain) =>
    shuffle(domain.questions).slice(0, 5).map((q) => ({ ...q, domain: domain.domain, color: domain.color, icon: domain.icon }))
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function AZ104Exam() {
  const [mode, setMode] = useState("immediate"); // immediate | end
  const [phase, setPhase] = useState("start"); // start | exam | results
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({}); // { qIndex: optionIndex }
  const [revealed, setRevealed] = useState({}); // { qIndex: true }
  const [flagged, setFlagged] = useState({});

  const startExam = () => {
    setQuestions(pickQuestions());
    setAnswers({});
    setRevealed({});
    setFlagged({});
    setCurrent(0);
    setPhase("exam");
  };

  const selectAnswer = (qIdx, optIdx) => {
    if (answers[qIdx] !== undefined) return;
    setAnswers((p) => ({ ...p, [qIdx]: optIdx }));
    if (mode === "immediate") setRevealed((p) => ({ ...p, [qIdx]: true }));
  };

  const finishExam = () => setPhase("results");

  const resetExam = () => setPhase("start");

  // domain weakness analysis
  const domainStats = () => {
    if (!questions.length) return [];
    const stats = {};
    questions.forEach((q, i) => {
      if (!stats[q.domain]) stats[q.domain] = { domain: q.domain, color: q.color, icon: q.icon, total: 0, correct: 0 };
      stats[q.domain].total++;
      if (answers[i] === q.answer) stats[q.domain].correct++;
    });
    return Object.values(stats).sort((a, b) => (a.correct / a.total) - (b.correct / b.total));
  };

  const totalCorrect = questions.filter((q, i) => answers[i] === q.answer).length;
  const score = questions.length ? Math.round((totalCorrect / questions.length) * 100) : 0;

  const allAnswered = questions.length > 0 && Object.keys(answers).length === questions.length;

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0e1a",
      color: "#e8eaf0",
      fontFamily: "'IBM Plex Mono', 'Courier New', monospace",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500;600&family=Space+Grotesk:wght@400;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0a0e1a; }
        ::-webkit-scrollbar-thumb { background: #2a3050; border-radius: 4px; }
        .opt-btn { transition: all 0.15s ease; cursor: pointer; }
        .opt-btn:hover { transform: translateX(3px); }
        .nav-btn { transition: all 0.15s; cursor: pointer; }
        .nav-btn:hover { opacity: 0.8; transform: translateY(-1px); }
        .toggle-pill { transition: all 0.2s; cursor: pointer; }
        .toggle-pill:hover { opacity: 0.85; }
        .domain-bar { transition: width 0.6s ease; }
        @keyframes fadeIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
        .fade-in { animation: fadeIn 0.3s ease forwards; }
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.6; } }
      `}</style>

      {/* ── HEADER ── */}
      <div style={{
        background: "linear-gradient(135deg, #0d1428 0%, #111827 50%, #0a1628 100%)",
        borderBottom: "1px solid #1e2d4a",
        padding: "20px 32px",
        display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 26 }}>☁️</span>
          <div>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, fontWeight: 700, color: "#fff" }}>
              AZ-104 Practice Exam
            </div>
            <div style={{ color: "#6b7a99", fontSize: 11 }}>Microsoft Azure Administrator · 25 Questions · 5 Domains</div>
          </div>
          <span style={{ background: "#00B4D8", color: "#000", fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 3, letterSpacing: 1 }}>
            BETA
          </span>
        </div>
        {phase === "exam" && (
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ color: "#6b7a99", fontSize: 11 }}>
              Q{current + 1} <span style={{ color: "#4a5580" }}>/ {questions.length}</span>
            </div>
            <div style={{ width: 140, height: 4, background: "#1a2040", borderRadius: 2 }}>
              <div style={{
                width: `${((current + 1) / questions.length) * 100}%`,
                height: "100%", background: "linear-gradient(90deg, #00B4D8, #06D6A0)",
                borderRadius: 2, transition: "width 0.3s",
              }} />
            </div>
            <div style={{ color: "#00B4D8", fontSize: 11, fontWeight: 600 }}>
              {Math.round(((current + 1) / questions.length) * 100)}%
            </div>
          </div>
        )}
      </div>

      <div style={{ maxWidth: 820, margin: "0 auto", padding: "32px 24px" }}>

        {/* ══════════════ START SCREEN ══════════════ */}
        {phase === "start" && (
          <div className="fade-in">
            {/* Mode toggle */}
            <div style={{
              background: "#111827", border: "1px solid #1e2d4a", borderRadius: 12, padding: 28, marginBottom: 24,
            }}>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 6 }}>
                Answer Mode
              </div>
              <div style={{ color: "#6b7a99", fontSize: 12, marginBottom: 20 }}>
                Choose how and when you see if your answer was correct.
              </div>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                {[
                  { key: "immediate", label: "⚡ Immediate Feedback", desc: "Shows right/wrong + explanation after each answer" },
                  { key: "end", label: "📋 Score at End", desc: "Reveals all answers and explanations after submitting" },
                ].map((m) => (
                  <div
                    key={m.key}
                    className="toggle-pill"
                    onClick={() => setMode(m.key)}
                    style={{
                      flex: 1, minWidth: 200,
                      background: mode === m.key ? "#0d1f3a" : "#0a1020",
                      border: `2px solid ${mode === m.key ? "#00B4D8" : "#1e2d4a"}`,
                      borderRadius: 8, padding: "14px 18px",
                    }}
                  >
                    <div style={{ color: mode === m.key ? "#00B4D8" : "#8899bb", fontWeight: 600, fontSize: 13, marginBottom: 4 }}>
                      {m.label}
                    </div>
                    <div style={{ color: "#4a5580", fontSize: 11 }}>{m.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Exam info */}
            <div style={{
              background: "#111827", border: "1px solid #1e2d4a", borderRadius: 12, padding: 28, marginBottom: 24,
            }}>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 16 }}>
                Exam Overview
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {questionBank.map((d) => (
                  <div key={d.domainId} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: 16 }}>{d.icon}</span>
                    <div style={{ flex: 1 }}>
                      <span style={{ color: "#c8d0e0", fontSize: 12 }}>{d.domain}</span>
                    </div>
                    <span style={{ color: d.color, fontSize: 11, fontWeight: 600 }}>5 questions</span>
                    <span style={{ color: "#4a5580", fontSize: 10 }}>({d.questions.length} in pool)</span>
                  </div>
                ))}
              </div>
              <div style={{
                marginTop: 20, padding: "12px 16px",
                background: "#0a1020", border: "1px solid #1a3050", borderRadius: 6,
                color: "#6b7a99", fontSize: 12, lineHeight: 1.7,
              }}>
                💡 Questions are randomly selected from each domain pool — every attempt is unique.
                Explanations are shown for all answers regardless of mode.
              </div>
            </div>

            <button
              className="nav-btn"
              onClick={startExam}
              style={{
                width: "100%", padding: "16px", borderRadius: 8, border: "none",
                background: "linear-gradient(135deg, #00B4D8, #06D6A0)",
                color: "#000", fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 16, fontWeight: 700, cursor: "pointer", letterSpacing: 0.5,
              }}
            >
              Start Exam →
            </button>
          </div>
        )}

        {/* ══════════════ EXAM SCREEN ══════════════ */}
        {phase === "exam" && questions.length > 0 && (() => {
          const q = questions[current];
          const selected = answers[current];
          const isRevealed = revealed[current];
          const isCorrect = selected === q.answer;

          return (
            <div className="fade-in">
              {/* Domain badge */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 14 }}>{q.icon}</span>
                  <span style={{
                    background: `${q.color}20`, border: `1px solid ${q.color}50`,
                    color: q.color, fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20,
                  }}>{q.domain}</span>
                </div>
                <span style={{ color: "#4a5580", fontSize: 11 }}>
                  Question {current + 1} of {questions.length}
                </span>
              </div>

              {/* Question */}
              <div style={{
                background: "#111827", border: "1px solid #1e2d4a", borderRadius: 10,
                padding: "24px 28px", marginBottom: 16,
              }}>
                <div style={{
                  fontFamily: "'Space Grotesk', sans-serif", fontSize: 17, fontWeight: 600,
                  color: "#fff", lineHeight: 1.6,
                }}>
                  {q.q}
                </div>
              </div>

              {/* Options */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
                {q.options.map((opt, i) => {
                  let borderColor = "#1e2d4a";
                  let bg = "#0f1520";
                  let textColor = "#c8d0e0";
                  let indicator = null;

                  if (selected === i) {
                    if (!isRevealed) {
                      borderColor = "#00B4D8"; bg = "#0a1a2a"; textColor = "#fff";
                    } else if (isCorrect) {
                      borderColor = "#06D6A0"; bg = "#051a10"; textColor = "#06D6A0";
                      indicator = "✓";
                    } else {
                      borderColor = "#FF6B6B"; bg = "#1a0808"; textColor = "#FF6B6B";
                      indicator = "✗";
                    }
                  } else if (isRevealed && i === q.answer) {
                    borderColor = "#06D6A0"; bg = "#051a10"; textColor = "#06D6A0";
                    indicator = "✓";
                  }

                  return (
                    <div
                      key={i}
                      className="opt-btn"
                      onClick={() => selectAnswer(current, i)}
                      style={{
                        background: bg, border: `2px solid ${borderColor}`,
                        borderRadius: 8, padding: "14px 18px",
                        display: "flex", alignItems: "center", gap: 12,
                        opacity: selected !== undefined && selected !== i && !(isRevealed && i === q.answer) ? 0.5 : 1,
                      }}
                    >
                      <span style={{
                        width: 24, height: 24, borderRadius: 6,
                        border: `2px solid ${borderColor}`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 11, fontWeight: 700, color: borderColor, flexShrink: 0,
                        background: indicator ? `${borderColor}20` : "transparent",
                      }}>
                        {indicator || String.fromCharCode(65 + i)}
                      </span>
                      <span style={{ color: textColor, fontSize: 13, lineHeight: 1.5 }}>{opt}</span>
                    </div>
                  );
                })}
              </div>

              {/* Explanation (immediate mode) */}
              {isRevealed && mode === "immediate" && (
                <div className="fade-in" style={{
                  background: isCorrect ? "#051a10" : "#150808",
                  border: `1px solid ${isCorrect ? "#06D6A0" : "#FF6B6B"}40`,
                  borderRadius: 8, padding: "16px 18px", marginBottom: 20,
                }}>
                  <div style={{ color: isCorrect ? "#06D6A0" : "#FF6B6B", fontSize: 11, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>
                    {isCorrect ? "✓ Correct" : "✗ Incorrect"} — Explanation
                  </div>
                  <div style={{ color: "#a0b0c8", fontSize: 13, lineHeight: 1.7 }}>{q.explanation}</div>
                </div>
              )}

              {/* Navigation */}
              <div style={{ display: "flex", gap: 12, justifyContent: "space-between" }}>
                <button
                  className="nav-btn"
                  onClick={() => setCurrent((c) => Math.max(0, c - 1))}
                  disabled={current === 0}
                  style={{
                    background: "transparent", border: "1px solid #1e2d4a",
                    color: current === 0 ? "#2a3a5a" : "#6b7a99",
                    padding: "10px 20px", borderRadius: 6, fontFamily: "inherit",
                    fontSize: 12, cursor: current === 0 ? "not-allowed" : "pointer",
                  }}
                >
                  ← Prev
                </button>

                <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>
                  {questions.map((_, i) => {
                    const isDone = answers[i] !== undefined;
                    const isRight = answers[i] === questions[i]?.answer;
                    let dotColor = "#1e2d4a";
                    if (isDone && mode === "immediate") dotColor = isRight ? "#06D6A0" : "#FF6B6B";
                    else if (isDone) dotColor = "#00B4D8";
                    return (
                      <div
                        key={i}
                        onClick={() => setCurrent(i)}
                        style={{
                          width: i === current ? 24 : 8, height: 8,
                          borderRadius: 4, background: i === current ? "#00B4D8" : dotColor,
                          cursor: "pointer", transition: "all 0.2s",
                        }}
                      />
                    );
                  })}
                </div>

                {current < questions.length - 1 ? (
                  <button
                    className="nav-btn"
                    onClick={() => setCurrent((c) => c + 1)}
                    style={{
                      background: "transparent", border: "1px solid #1e2d4a",
                      color: "#6b7a99", padding: "10px 20px", borderRadius: 6,
                      fontFamily: "inherit", fontSize: 12,
                    }}
                  >
                    Next →
                  </button>
                ) : (
                  <button
                    className="nav-btn"
                    onClick={finishExam}
                    disabled={!allAnswered}
                    style={{
                      background: allAnswered ? "linear-gradient(135deg, #00B4D8, #06D6A0)" : "#1a2040",
                      border: "none", color: allAnswered ? "#000" : "#2a3a5a",
                      padding: "10px 20px", borderRadius: 6, fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: 12, fontWeight: 700, cursor: allAnswered ? "pointer" : "not-allowed",
                    }}
                  >
                    Finish →
                  </button>
                )}
              </div>
            </div>
          );
        })()}

        {/* ══════════════ RESULTS SCREEN ══════════════ */}
        {phase === "results" && (
          <div className="fade-in">
            {/* Score card */}
            <div style={{
              background: "#111827", border: `1px solid ${score >= 70 ? "#06D6A030" : "#FF6B6B30"}`,
              borderRadius: 12, padding: 32, marginBottom: 24, textAlign: "center",
            }}>
              <div style={{ color: "#6b7a99", fontSize: 12, marginBottom: 8, letterSpacing: 1, textTransform: "uppercase" }}>
                Final Score
              </div>
              <div style={{
                fontFamily: "'Space Grotesk', sans-serif", fontSize: 72, fontWeight: 700,
                color: score >= 70 ? "#06D6A0" : score >= 50 ? "#FFB703" : "#FF6B6B",
                lineHeight: 1,
              }}>
                {score}%
              </div>
              <div style={{ color: "#6b7a99", fontSize: 14, marginTop: 8 }}>
                {totalCorrect} correct out of {questions.length} questions
              </div>
              <div style={{ marginTop: 12, color: score >= 70 ? "#06D6A0" : "#FF6B6B", fontSize: 13, fontWeight: 600 }}>
                {score >= 70 ? "✓ Above passing threshold" : "✗ Below passing threshold (700/1000)"}
              </div>
            </div>

            {/* Domain weakness */}
            <div style={{
              background: "#111827", border: "1px solid #1e2d4a", borderRadius: 12, padding: 24, marginBottom: 24,
            }}>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 16 }}>
                📊 Domain Performance
              </div>
              {domainStats().map((d) => {
                const pct = Math.round((d.correct / d.total) * 100);
                return (
                  <div key={d.domain} style={{ marginBottom: 16 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <span style={{ fontSize: 13 }}>{d.icon}</span>
                        <span style={{ color: "#c8d0e0", fontSize: 12 }}>{d.domain}</span>
                        {pct < 60 && (
                          <span style={{ background: "#FF6B6B20", border: "1px solid #FF6B6B40", color: "#FF6B6B", fontSize: 10, padding: "1px 6px", borderRadius: 3 }}>
                            needs work
                          </span>
                        )}
                      </div>
                      <span style={{ color: pct >= 80 ? "#06D6A0" : pct >= 60 ? "#FFB703" : "#FF6B6B", fontSize: 12, fontWeight: 600 }}>
                        {d.correct}/{d.total} ({pct}%)
                      </span>
                    </div>
                    <div style={{ height: 6, background: "#0a1020", borderRadius: 3, overflow: "hidden" }}>
                      <div className="domain-bar" style={{
                        width: `${pct}%`, height: "100%",
                        background: pct >= 80 ? "#06D6A0" : pct >= 60 ? "#FFB703" : "#FF6B6B",
                        borderRadius: 3,
                      }} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Answer review (end mode) */}
            {mode === "end" && (
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 16 }}>
                  📋 Answer Review
                </div>
                {questions.map((q, i) => {
                  const sel = answers[i];
                  const correct = sel === q.answer;
                  return (
                    <div key={i} style={{
                      background: correct ? "#051a10" : "#150808",
                      border: `1px solid ${correct ? "#06D6A040" : "#FF6B6B40"}`,
                      borderRadius: 10, padding: "20px 22px", marginBottom: 12,
                    }}>
                      <div style={{ display: "flex", gap: 10, marginBottom: 12, alignItems: "flex-start" }}>
                        <span style={{ color: correct ? "#06D6A0" : "#FF6B6B", fontSize: 16, flexShrink: 0, marginTop: 1 }}>
                          {correct ? "✓" : "✗"}
                        </span>
                        <div>
                          <div style={{ color: "#6b7a99", fontSize: 10, marginBottom: 4 }}>{q.icon} {q.domain} · Q{i + 1}</div>
                          <div style={{ color: "#e8eaf0", fontSize: 13, fontWeight: 600, lineHeight: 1.5 }}>{q.q}</div>
                        </div>
                      </div>
                      <div style={{ paddingLeft: 26 }}>
                        {!correct && (
                          <div style={{ marginBottom: 8 }}>
                            <span style={{ color: "#FF6B6B", fontSize: 11 }}>Your answer: </span>
                            <span style={{ color: "#FF6B6B80", fontSize: 12 }}>{q.options[sel]}</span>
                          </div>
                        )}
                        <div style={{ marginBottom: 10 }}>
                          <span style={{ color: "#06D6A0", fontSize: 11 }}>Correct answer: </span>
                          <span style={{ color: "#06D6A0", fontSize: 12 }}>{q.options[q.answer]}</span>
                        </div>
                        <div style={{
                          background: "#0a1020", border: "1px solid #1a3050",
                          borderRadius: 6, padding: "10px 14px",
                        }}>
                          <div style={{ color: "#4a5580", fontSize: 10, letterSpacing: 1, textTransform: "uppercase", marginBottom: 5 }}>Explanation</div>
                          <div style={{ color: "#a0b0c8", fontSize: 12, lineHeight: 1.7 }}>{q.explanation}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Retake */}
            <div style={{ display: "flex", gap: 12 }}>
              <button
                className="nav-btn"
                onClick={resetExam}
                style={{
                  flex: 1, padding: "14px", borderRadius: 8, border: "none",
                  background: "linear-gradient(135deg, #00B4D8, #06D6A0)",
                  color: "#000", fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 15, fontWeight: 700,
                }}
              >
                🔄 New Exam (Shuffle Questions)
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}