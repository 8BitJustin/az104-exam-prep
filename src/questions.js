// ─────────────────────────────────────────────────────────────────────────────
// AZ-104 Question Bank
// ─────────────────────────────────────────────────────────────────────────────
// Structure:
//   - Each domain object contains: domain name, domainId, color, icon, questions[]
//   - Each question contains: id, q, options[], answer (index), explanation
//
// To add questions: find the correct domain and add a new object to its
// questions[] array. Follow the existing format. The app will automatically
// include new questions in the random pool.
// ─────────────────────────────────────────────────────────────────────────────

export const questionBank = [

  // ── DOMAIN 1: Identities & Governance (20–25%) ────────────────────────────
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
        addedInVersion: "1.0.0",
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
        addedInVersion: "1.0.0",
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
        addedInVersion: "1.0.0",
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
        addedInVersion: "1.0.0",
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
        addedInVersion: "1.0.0",
      },
      {
        id: "1f",
        q: "What is the maximum number of days a soft-deleted user can be restored in Microsoft Entra ID?",
        options: ["7 days", "14 days", "30 days", "90 days"],
        answer: 2,
        explanation:
          "Entra ID retains soft-deleted users for exactly 30 days. During this window, the account — including its group memberships and properties — can be fully restored.",
        addedInVersion: "1.0.0",
      },
      {
        id: "1g",
        q: "You need to allow a team member to view resources in a subscription but not make any changes. Which built-in RBAC role should you assign?",
        options: ["Contributor", "Owner", "Reader", "User Access Administrator"],
        answer: 2,
        explanation:
          "Reader grants read-only access across all resource types within the assigned scope. Contributor adds write/delete. Owner adds access management. User Access Administrator manages role assignments specifically.",
        addedInVersion: "1.0.0",
      },
      {
        id: "1h",
        q: "Which Azure Policy effect should you use if you want to log non-compliant resources without blocking their creation?",
        options: ["Deny", "Append", "Audit", "Modify"],
        answer: 2,
        explanation:
          "Audit evaluates resources and logs non-compliance to the Activity Log without preventing the operation. Use Deny to block, DeployIfNotExists to auto-remediate, and Append to add fields to requests.",
        addedInVersion: "1.0.0",
      },
      {
        id: "1i",
        q: "A resource tag strategy is required for all new resources. You want to automatically add a missing 'CostCenter' tag without blocking deployments. Which policy effect is best?",
        options: ["Deny", "Audit", "Append", "Modify"],
        answer: 3,
        explanation:
          "Modify is used to add, update, or remove properties (including tags) on resources during create or update operations. Append adds fields to the request payload but Modify is the correct effect specifically for tags on existing and new resources.",
        addedInVersion: "1.0.0",
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
        addedInVersion: "1.0.0",
      },
      {
        id: "1k",
        q: "You need to allow users to reset their own passwords without contacting the help desk. What should you enable?",
        options: [
          "Multi-Factor Authentication (MFA)",
          "Self-Service Password Reset (SSPR)",
          "Privileged Identity Management (PIM)",
          "Conditional Access Policy",
        ],
        answer: 1,
        explanation: "SSPR allows users to reset their own passwords using verification methods like email, phone, or authenticator app. It reduces help desk load and is configured in Entra ID under Password Reset. MFA is an authentication requirement, not a reset mechanism.",
        addedInVersion: "1.5.1",
      },
      {
        id: "1l",
        q: "What is the purpose of Privileged Identity Management (PIM) in Microsoft Entra ID?",
        options: [
          "To assign permanent admin roles to all IT staff",
          "To provide just-in-time, time-limited activation of privileged roles",
          "To enforce MFA on all user accounts",
          "To monitor guest user access across the tenant",
        ],
        answer: 1,
        explanation: "PIM enables just-in-time privileged access, requiring eligible users to activate roles for a limited time window. This reduces the attack surface of permanently assigned admin roles. It requires Entra ID P2 licensing.",
        addedInVersion: "1.5.1",
      },
      {
        id: "1m",
        q: "A guest user from an external organization needs read access to a specific resource group. What is the correct approach?",
        options: [
          "Create a new internal account for the guest user",
          "Invite the guest via Entra ID B2B collaboration and assign the Reader role on the resource group",
          "Share the subscription owner credentials temporarily",
          "Enable anonymous access on the resource group",
        ],
        answer: 1,
        explanation: "Entra ID B2B collaboration allows external users to be invited as guests using their own identity. You then assign RBAC roles at the appropriate scope. This avoids creating internal accounts and maintains security boundaries.",
        addedInVersion: "1.5.1",
      },
      {
        id: "1n",
        q: "You want to ensure that all users signing in from outside the corporate network must use MFA. What should you configure?",
        options: [
          "A dynamic group membership rule",
          "A Conditional Access policy with MFA requirement for non-corporate IPs",
          "A Global MFA policy applied to all users at all times",
          "An Azure Policy with a Deny effect",
        ],
        answer: 1,
        explanation: "Conditional Access policies evaluate signals like location, device, and user risk to enforce controls like MFA. Named locations can define corporate IP ranges, and the policy can require MFA only when signing in from outside those ranges.",
        addedInVersion: "1.5.1",
      },
      {
        id: "1o",
        q: "Which Azure AD / Entra ID license is required to use dynamic group membership rules?",
        options: [
          "Microsoft 365 Business Basic",
          "Entra ID Free",
          "Entra ID P1 or P2",
          "Entra ID P2 only",
        ],
        answer: 2,
        explanation: "Dynamic group membership requires Entra ID P1 or P2 (included in Microsoft 365 E3/E5 and EMS E3/E5). The Free tier only supports manually assigned group membership.",
        addedInVersion: "1.5.1",
      },
      {
        id: "1p",
        q: "You need to prevent users from creating new resource groups in a subscription. What is the most efficient approach?",
        options: [
          "Remove the Contributor role from all users",
          "Assign a custom RBAC role that excludes Microsoft.Resources/subscriptions/resourceGroups/write",
          "Apply a ReadOnly lock to the subscription",
          "Set a Deny Azure Policy on resource group creation",
        ],
        answer: 1,
        explanation: "A custom RBAC role that excludes the write permission for resource groups allows users to manage resources within existing groups while preventing creation of new ones. A ReadOnly lock would be too broad, blocking all write operations across the subscription.",
        addedInVersion: "1.5.1",
      },
      {
        id: "1q",
        q: "What happens when a Management Group policy is assigned at the root level?",
        options: [
          "It applies only to the management group itself",
          "It applies to all subscriptions and resource groups within the entire tenant hierarchy",
          "It applies only to resource groups directly under the root",
          "It requires manual propagation to child subscriptions",
        ],
        answer: 1,
        explanation: "Policies assigned at the root Management Group level inherit down through all child management groups, subscriptions, resource groups, and resources in the tenant. This makes it the broadest possible scope for policy enforcement.",
        addedInVersion: "1.5.1",
      },
      {
        id: "1r",
        q: "A user reports they cannot see a resource group that was just created. They have the Reader role at the subscription level. What is the most likely cause?",
        options: [
          "The Reader role does not include resource group visibility",
          "RBAC role assignments can take up to 30 minutes to propagate",
          "The user needs the Contributor role to view resource groups",
          "The resource group has a ReadOnly lock applied",
        ],
        answer: 1,
        explanation: "Azure RBAC role assignments can take several minutes to propagate through the system. This is a common real-world scenario. The Reader role does include resource group visibility — the delay is a propagation timing issue.",
        addedInVersion: "1.5.1",
      },
      {
        id: "1s",
        q: "Which tool in Azure allows you to see what actions a specific user can perform on a resource before assigning a role?",
        options: [
          "Azure Advisor",
          "Access Control (IAM) → Check Access",
          "Azure Policy Compliance blade",
          "Microsoft Defender for Cloud",
        ],
        answer: 1,
        explanation: "The 'Check Access' feature in the Access Control (IAM) blade lets you look up a specific user, group, or service principal and see their current role assignments and effective permissions on that resource.",
        addedInVersion: "1.5.1",
      },
      {
        id: "1t",
        q: "You need to ensure a specific Azure resource cannot be deleted by anyone, including subscription owners. What should you apply?",
        options: [
          "A Deny Azure Policy with a delete effect",
          "Remove the Owner role from all users",
          "A CanNotDelete resource lock",
          "A ReadOnly resource lock",
        ],
        answer: 2,
        explanation: "A CanNotDelete lock prevents deletion of a resource even by subscription Owners. The lock must be removed before the resource can be deleted. ReadOnly locks prevent modifications but CanNotDelete specifically targets deletion while still allowing reads and updates.",
        addedInVersion: "1.5.1",
      },
    ],
  },

  // ── DOMAIN 2: Storage (15–20%) ─────────────────────────────────────────────
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
        addedInVersion: "1.0.0",
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
        addedInVersion: "1.0.0",
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
        addedInVersion: "1.0.0",
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
        addedInVersion: "1.0.0",
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
        addedInVersion: "1.0.0",
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
        addedInVersion: "1.0.0",
      },
      {
        id: "2g",
        q: "Which blob type is optimized for append operations, such as logging?",
        options: ["Block blob", "Page blob", "Append blob", "Archive blob"],
        answer: 2,
        explanation:
          "Append blobs are optimized for append operations. Data can only be added to the end of the blob, making them ideal for logging scenarios. Block blobs are general-purpose. Page blobs are used for VHD/disk files.",
        addedInVersion: "1.0.0",
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
        addedInVersion: "1.0.0",
      },
      {
        id: "2i",
        q: "You need to copy large amounts of data to Azure Blob Storage from an on-premises server with a slow internet connection. Which service is most appropriate?",
        options: [
          "AzCopy over the internet",
          "Azure Data Box",
          "Azure File Sync",
          "Azure Import/Export service with shipped drives",
        ],
        answer: 1,
        explanation: "Azure Data Box is a physical device Microsoft ships to you. You load data onto it on-premises and ship it back to Microsoft, who uploads it to your storage account. It's designed for large datasets where internet transfer would take too long or be too costly.",
        addedInVersion: "1.5.1",
      },
      {
        id: "2j",
        q: "A storage account is configured with LRS. A fire destroys the entire datacenter. What happens to the data?",
        options: [
          "Data is recovered from the secondary region automatically",
          "Data is lost — LRS only maintains copies within a single datacenter",
          "Data is recovered from availability zone replicas",
          "Microsoft restores the data within 24 hours",
        ],
        answer: 1,
        explanation: "LRS (Locally Redundant Storage) maintains 3 copies of data within a single datacenter. A datacenter-level disaster would result in data loss. ZRS, GRS, or GZRS should be used when datacenter-level resilience is required.",
        addedInVersion: "1.5.1",
      },
      {
        id: "2k",
        q: "You want to allow a specific application to read blobs from a container using its own identity without using access keys or SAS tokens. What should you configure?",
        options: [
          "Generate a long-lived SAS token for the application",
          "Assign the Storage Blob Data Reader role to the application's managed identity",
          "Enable anonymous public access on the container",
          "Share the storage account access key with the application",
        ],
        answer: 1,
        explanation: "Managed identities provide Azure resources with an automatically managed identity in Entra ID. Assigning the Storage Blob Data Reader role to the managed identity allows the application to authenticate without credentials or keys — the most secure approach.",
        addedInVersion: "1.5.1",
      },
      {
        id: "2l",
        q: "What is the difference between a stored access policy and a standard SAS token?",
        options: [
          "Stored access policies support account-level SAS; standard SAS is service-level only",
          "A stored access policy allows you to modify or revoke SAS permissions after the token is issued",
          "Standard SAS tokens never expire; stored access policies have mandatory expiry",
          "There is no practical difference between the two",
        ],
        answer: 1,
        explanation: "A stored access policy is defined on the container and referenced by a SAS token. If you need to revoke or modify access, you update or delete the policy — invalidating all SAS tokens linked to it. Standard SAS tokens cannot be revoked once issued without rotating the account key.",
        addedInVersion: "1.5.1",
      },
      {
        id: "2m",
        q: "You need to allow users to upload files directly to Azure Blob Storage from a web browser on a different domain. What must you configure on the storage account?",
        options: [
          "A SAS token with browser permissions",
          "Cross-Origin Resource Sharing (CORS) rules",
          "Anonymous public access on the container",
          "A Private Endpoint for the storage account",
        ],
        answer: 1,
        explanation: "CORS rules on a storage account define which external domains are allowed to make requests directly to the storage service from a browser. Without CORS configured, browsers will block cross-origin requests due to the same-origin policy.",
        addedInVersion: "1.5.1",
      },
      {
        id: "2n",
        q: "Which storage redundancy option provides the highest durability and protects against both zone and regional failures?",
        options: [
          "Zone-Redundant Storage (ZRS)",
          "Geo-Redundant Storage (GRS)",
          "Geo-Zone-Redundant Storage (GZRS)",
          "Read-Access Geo-Redundant Storage (RA-GRS)",
        ],
        answer: 2,
        explanation: "GZRS combines ZRS (synchronous replication across 3 availability zones in the primary region) with GRS (asynchronous replication to a secondary region). It provides protection against both zone-level and regional failures, offering the highest durability tier.",
        addedInVersion: "1.5.1",
      },
      {
        id: "2o",
        q: "You need to transfer 10TB of data from Azure Blob Storage to an on-premises server as quickly as possible. Which tool is best suited?",
        options: [
          "Azure Storage Explorer drag and drop",
          "AzCopy with parallel transfers",
          "Azure Data Factory pipeline",
          "Azure File Sync with cloud tiering disabled",
        ],
        answer: 1,
        explanation: "AzCopy is a command-line tool optimized for high-performance data transfers to and from Azure Storage. It supports parallel transfers, resumable operations, and is significantly faster than Storage Explorer for large datasets.",
        addedInVersion: "1.5.1",
      },
      {
        id: "2p",
        q: "A blob in the Archive tier needs to be read immediately. What must you do first?",
        options: [
          "Generate a SAS token with Archive read permissions",
          "Enable RA-GRS to access the secondary region copy",
          "Rehydrate the blob to Hot or Cool tier first",
          "Archive blobs can be read directly with no action needed",
        ],
        answer: 2,
        explanation: "Blobs in the Archive tier are offline and cannot be read directly. They must first be rehydrated to Hot or Cool tier, which can take up to 15 hours for standard priority or up to 1 hour for high priority rehydration.",
        addedInVersion: "1.5.1",
      },
      {
        id: "2q",
        q: "You want to track all read and write operations on a storage account for security auditing. What should you enable?",
        options: [
          "Storage account metrics in Azure Monitor",
          "Diagnostic settings with Storage Analytics logging",
          "Azure Defender for Storage alerts only",
          "NSG Flow Logs on the storage subnet",
        ],
        answer: 1,
        explanation: "Storage Analytics logging records details of successful and failed requests to your storage account including read, write, and delete operations. Diagnostic settings send these logs to Log Analytics, a storage account, or Event Hub for auditing and analysis.",
        addedInVersion: "1.5.1",
      },
      {
        id: "2r",
        q: "What is the purpose of object replication in Azure Blob Storage?",
        options: [
          "To replicate blobs synchronously across availability zones",
          "To asynchronously copy block blobs between storage accounts in different regions",
          "To create point-in-time snapshots of blob containers",
          "To mirror a storage account for disaster recovery failover",
        ],
        answer: 1,
        explanation: "Object replication asynchronously copies block blobs from a source container to a destination container, which can be in a different region or subscription. It's used for data distribution, backup, and latency reduction. It requires blob versioning to be enabled.",
        addedInVersion: "1.5.1",
      },
    ],
  },

  // ── DOMAIN 3: Compute (20–25%) ─────────────────────────────────────────────
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
        addedInVersion: "1.0.0",
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
        addedInVersion: "1.0.0",
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
        addedInVersion: "1.0.0",
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
        addedInVersion: "1.0.0",
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
        addedInVersion: "1.0.0",
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
        addedInVersion: "1.0.0",
      },
      {
        id: "3g",
        q: "Which App Service plan tier is required to use deployment slots?",
        options: ["Free (F1)", "Shared (D1)", "Basic (B1)", "Standard (S1) or higher"],
        answer: 3,
        explanation:
          "Deployment slots are available starting at Standard (S1) tier and above. Free and Shared tiers don't support slots. Basic supports custom domains/SSL but not slots. Standard is the minimum for slots, autoscale, and Traffic Manager integration.",
        addedInVersion: "1.0.0",
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
        addedInVersion: "1.0.0",
      },
      {
        id: "3i",
        q: "You need to run a script automatically every time a new VM is deployed in Azure. Which feature allows you to do this?",
        options: [
          "Azure Automation Runbook",
          "Custom Script Extension",
          "VM Boot Diagnostics",
          "Azure Policy DeployIfNotExists effect",
        ],
        answer: 1,
        explanation: "The Custom Script Extension downloads and executes scripts on Azure VMs during or after deployment. It's commonly used for post-deployment configuration, software installation, and automation tasks. It runs once at deployment time.",
        addedInVersion: "1.5.1",
      },
      {
        id: "3j",
        q: "What is the maximum number of VMs supported in a single Availability Set?",
        options: ["10", "50", "100", "200"],
        answer: 3,
        explanation: "An Availability Set supports up to 200 VMs. It provides up to 3 fault domains and up to 20 update domains. VMs in the same Availability Set are distributed across fault and update domains to protect against hardware failures and planned maintenance.",
        addedInVersion: "1.5.1",
      },
      {
        id: "3k",
        q: "You have a web app on Azure App Service that is experiencing performance issues during peak hours. Without changing the pricing tier, what can you do to improve performance?",
        options: [
          "Enable autoscale to add more instances",
          "Increase the VM size of the App Service Plan",
          "Move the app to a dedicated VM",
          "Enable deployment slots for load distribution",
        ],
        answer: 0,
        explanation: "Autoscale allows App Service to automatically add or remove instances based on metrics like CPU or HTTP queue length. This horizontal scaling distributes load across multiple instances without requiring a tier upgrade or manual intervention.",
        addedInVersion: "1.5.1",
      },
      {
        id: "3l",
        q: "Which VM series in Azure is specifically optimized for memory-intensive workloads like large databases and in-memory analytics?",
        options: [
          "B-series (Burstable)",
          "D-series (General Purpose)",
          "E-series (Memory Optimized)",
          "F-series (Compute Optimized)",
        ],
        answer: 2,
        explanation: "The E-series is memory optimized, offering high memory-to-CPU ratios ideal for relational databases, large caches, and in-memory analytics. B-series is for burstable workloads. D-series is general purpose. F-series is compute optimized for CPU-heavy tasks.",
        addedInVersion: "1.5.1",
      },
      {
        id: "3m",
        q: "You need to ensure that a VM is automatically shut down every night at 11 PM to save costs. What is the simplest way to achieve this?",
        options: [
          "Create an Azure Automation runbook with a schedule",
          "Enable Auto-shutdown on the VM in the portal",
          "Create an Azure Function with a timer trigger",
          "Configure a VM Scale Set with a scale-in schedule",
        ],
        answer: 1,
        explanation: "Azure VMs have a built-in Auto-shutdown feature configurable directly in the portal under the VM's Operations section. It allows you to set a daily shutdown time and optionally send a notification before shutdown. It's the simplest solution for cost management.",
        addedInVersion: "1.5.1",
      },
      {
        id: "3n",
        q: "What is the difference between stopping a VM using the OS shutdown command versus deallocating it from the Azure portal?",
        options: [
          "There is no difference — both stop billing immediately",
          "OS shutdown stops the VM but keeps it allocated, so compute charges continue. Deallocate releases the hardware and stops compute billing.",
          "Deallocating deletes the VM disks; OS shutdown preserves them",
          "OS shutdown is faster and recommended for cost savings",
        ],
        answer: 1,
        explanation: "Shutting down from within the OS leaves the VM in a 'Stopped' state but still allocated on Azure hardware — compute charges continue. Deallocating from the portal releases the underlying hardware, stopping compute charges. Storage charges still apply in both cases.",
        addedInVersion: "1.5.1",
      },
      {
        id: "3o",
        q: "You need to deploy an application that requires Windows Server with SQL Server pre-installed. What is the fastest way to achieve this in Azure?",
        options: [
          "Deploy a Windows Server VM and install SQL Server manually",
          "Use an Azure Marketplace image with SQL Server pre-installed",
          "Deploy Azure SQL Database instead",
          "Use a custom VHD uploaded from on-premises",
        ],
        answer: 1,
        explanation: "Azure Marketplace offers pre-configured images with SQL Server already installed on Windows Server in various editions. This eliminates manual installation and licensing complexity. The image includes both the OS and SQL Server, ready to configure.",
        addedInVersion: "1.5.1",
      },
      {
        id: "3p",
        q: "Which Azure service provides serverless, event-driven compute that automatically scales to zero when not in use?",
        options: [
          "Azure App Service on Free tier",
          "Azure Container Instances",
          "Azure Functions with Consumption plan",
          "Azure VM Scale Sets with minimum 0 instances",
        ],
        answer: 2,
        explanation: "Azure Functions on the Consumption plan scales automatically including to zero when idle, and you pay only for executions. This makes it truly serverless. App Service Free tier still runs on allocated infrastructure. ACI charges while the container is running.",
        addedInVersion: "1.5.1",
      },
      {
        id: "3q",
        q: "You need to capture a consistent snapshot of an Azure VM's OS disk while the VM is running. What should you use?",
        options: [
          "Azure Backup with application-consistent snapshots",
          "Manual disk snapshot from the Disks blade",
          "VM Checkpoint via Hyper-V Manager",
          "Azure Site Recovery replication point",
        ],
        answer: 0,
        explanation: "Azure Backup creates application-consistent snapshots using VSS (Volume Shadow Copy Service) on Windows or pre/post scripts on Linux, ensuring data integrity while the VM is running. Manual disk snapshots are crash-consistent and may result in data inconsistency for running VMs.",
        addedInVersion: "1.5.1",
      },
      {
        id: "3r",
        q: "A company needs to run a batch processing workload that can tolerate interruptions and wants the lowest possible compute cost. Which option is best?",
        options: [
          "Reserved VM Instances",
          "Azure Spot VMs",
          "Standard pay-as-you-go VMs",
          "Azure Dedicated Hosts",
        ],
        answer: 1,
        explanation: "Azure Spot VMs use unused Azure capacity at discounts of up to 90% compared to pay-as-you-go pricing. They can be evicted when Azure needs the capacity back, making them ideal for fault-tolerant, interruptible workloads like batch processing, rendering, or dev/test.",
        addedInVersion: "1.5.1",
      },
    ],
  },

  // ── DOMAIN 4: Virtual Networking (25–30%) ──────────────────────────────────
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
        addedInVersion: "1.0.0",
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
        addedInVersion: "1.0.0",
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
        addedInVersion: "1.0.0",
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
        addedInVersion: "1.0.0",
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
        addedInVersion: "1.0.0",
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
        addedInVersion: "1.0.0",
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
        addedInVersion: "1.0.0",
      },
      {
        id: "4h",
        q: "What is the minimum subnet size required for an Azure VPN Gateway subnet?",
        options: ["/29", "/28", "/27", "/26"],
        answer: 2,
        explanation:
          "Microsoft recommends a /27 (32 addresses) or larger for the GatewaySubnet to accommodate future gateway additions and VPN/ExpressRoute coexistence. A /29 is the absolute minimum but is not recommended for production.",
        addedInVersion: "1.0.0",
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
        addedInVersion: "1.0.0",
      },
      {
        id: "4j",
        q: "You need to route all outbound internet traffic from a subnet through a network virtual appliance (NVA) for inspection. What should you configure?",
        options: [
          "An NSG outbound rule pointing to the NVA",
          "A User Defined Route (UDR) with a 0.0.0.0/0 next hop pointing to the NVA's private IP",
          "A VNet peering with the NVA's VNet",
          "A service endpoint for internet traffic on the subnet",
        ],
        answer: 1,
        explanation: "User Defined Routes override Azure's default system routes. A UDR with destination 0.0.0.0/0 and next hop set to the NVA's private IP forces all outbound internet traffic through the appliance for inspection. NSGs control allow/deny but cannot redirect traffic to a specific device.",
        addedInVersion: "1.5.1",
      },
      {
        id: "4k",
        q: "What is the purpose of Azure Bastion?",
        options: [
          "To provide a VPN connection between on-premises and Azure",
          "To allow secure RDP and SSH access to VMs without exposing public IPs",
          "To load balance traffic across multiple VMs",
          "To monitor network traffic flows across VNets",
        ],
        answer: 1,
        explanation: "Azure Bastion is a fully managed PaaS service that provides secure RDP and SSH access to VMs directly through the Azure portal over TLS, without requiring a public IP on the VM. It eliminates exposure of management ports to the internet.",
        addedInVersion: "1.5.1",
      },
      {
        id: "4l",
        q: "You have a VNet with address space 10.0.0.0/16. You need to create the largest possible single subnet. What is the maximum prefix length you can use?",
        options: ["/16", "/17", "/24", "/29"],
        answer: 1,
        explanation: "Within a /16 VNet, the largest single subnet you can create is /17, which provides 32,768 addresses (minus 5 Azure reserved addresses). Azure reserves the first 4 and last IP in every subnet. You cannot create a subnet with the same prefix as the VNet itself.",
        addedInVersion: "1.5.1",
      },
      {
        id: "4m",
        q: "Which Azure service acts as a cloud-native firewall with centralized policy management across multiple VNets and subscriptions?",
        options: [
          "Network Security Group (NSG)",
          "Azure Application Gateway with WAF",
          "Azure Firewall",
          "Azure DDoS Protection",
        ],
        answer: 2,
        explanation: "Azure Firewall is a managed, cloud-native network security service providing stateful packet inspection, FQDN filtering, threat intelligence, and centralized policy management. Unlike NSGs which are per-subnet/NIC, Azure Firewall operates at the VNet level and supports hub-spoke topologies.",
        addedInVersion: "1.5.1",
      },
      {
        id: "4n",
        q: "What is the key difference between a Service Endpoint and a Private Endpoint for Azure Storage?",
        options: [
          "Service Endpoints are free; Private Endpoints cost extra per hour",
          "Service Endpoints keep traffic on the Microsoft backbone but the storage account still has a public IP. Private Endpoints assign a private IP within your VNet, fully removing public exposure.",
          "Private Endpoints only work with Blob storage; Service Endpoints support all storage types",
          "There is no functional difference — they are interchangeable",
        ],
        answer: 1,
        explanation: "Service Endpoints route traffic over the Microsoft backbone and allow you to restrict access to specific VNets, but the storage account retains its public endpoint. Private Endpoints inject a private IP directly into your VNet, making the storage account completely private with no public endpoint required.",
        addedInVersion: "1.5.1",
      },
      {
        id: "4o",
        q: "You need to connect your on-premises network to Azure with a guaranteed bandwidth SLA, low latency, and a private connection that does not traverse the public internet. What should you use?",
        options: [
          "Site-to-Site VPN Gateway",
          "Point-to-Site VPN",
          "Azure ExpressRoute",
          "Global VNet Peering",
        ],
        answer: 2,
        explanation: "ExpressRoute provides a private, dedicated connection between on-premises and Azure through a connectivity provider, bypassing the public internet entirely. It offers guaranteed bandwidth, lower latency, and higher reliability than VPN connections which traverse the internet.",
        addedInVersion: "1.5.1",
      },
      {
        id: "4p",
        q: "An NSG is associated with both a subnet and a VM's NIC. Inbound traffic arrives at the subnet. In what order are the NSG rules evaluated?",
        options: [
          "NIC NSG first, then subnet NSG",
          "Subnet NSG first, then NIC NSG",
          "Both NSGs are evaluated simultaneously",
          "Only the most restrictive NSG applies",
        ],
        answer: 1,
        explanation: "For inbound traffic, the subnet NSG is evaluated first, then the NIC NSG. For outbound traffic, the order reverses — NIC NSG first, then subnet NSG. Traffic must pass both NSGs to reach the VM. If either denies the traffic, it is blocked.",
        addedInVersion: "1.5.1",
      },
      {
        id: "4q",
        q: "You need to distribute incoming HTTPS traffic across multiple backend VMs based on the URL path. Which Azure service should you use?",
        options: [
          "Azure Standard Load Balancer",
          "Azure Traffic Manager",
          "Azure Application Gateway",
          "Azure Front Door",
        ],
        answer: 2,
        explanation: "Azure Application Gateway supports path-based routing, allowing you to direct requests to different backend pools based on URL paths (e.g., /images to one pool, /api to another). Standard Load Balancer is Layer 4 only and does not inspect URL paths.",
        addedInVersion: "1.5.1",
      },
      {
        id: "4r",
        q: "What does Azure DDoS Protection Standard provide that the Basic tier does not?",
        options: [
          "Basic DDoS protection is not included in Azure by default",
          "Standard provides adaptive tuning, attack telemetry, rapid response support, and cost protection guarantees",
          "Standard protects VMs only; Basic protects all resource types",
          "They provide identical protection — Standard just adds a dashboard",
        ],
        answer: 1,
        explanation: "Azure DDoS Basic is automatically enabled for all Azure resources at no cost but offers limited protection. DDoS Protection Standard adds adaptive real-time tuning, detailed attack telemetry and alerts, access to the DDoS Rapid Response team, and cost protection credits for scaled-out resources during an attack.",
        addedInVersion: "1.5.1",
      },
      {
        id: "4s",
        q: "You need DNS resolution for Azure resources within a VNet to work automatically without manual record management. Which solution requires the least administrative overhead?",
        options: [
          "Deploy a custom DNS server VM in the VNet",
          "Use Azure-provided DNS with a Private DNS Zone and auto-registration enabled",
          "Manually create A records for each VM in a public DNS zone",
          "Configure each VM with a static hostname in its OS",
        ],
        answer: 1,
        explanation: "Azure Private DNS Zones with auto-registration enabled automatically create and manage A records for VMs deployed in linked VNets. This eliminates manual DNS management entirely. Custom DNS servers require VM maintenance and configuration overhead.",
        addedInVersion: "1.5.1",
      },
    ],
  },

  // ── DOMAIN 5: Monitor & Maintain (10–15%) ─────────────────────────────────
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
        addedInVersion: "1.0.0",
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
        addedInVersion: "1.0.0",
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
        addedInVersion: "1.0.0",
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
        addedInVersion: "1.0.0",
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
        addedInVersion: "1.0.0",
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
        addedInVersion: "1.0.0",
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
        addedInVersion: "1.0.0",
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
        addedInVersion: "1.0.0",
      },
      {
        id: "5i",
        q: "You need to monitor the performance of an application running on an Azure VM and correlate it with the underlying infrastructure metrics. Which service provides this unified view?",
        options: [
          "Azure Service Health",
          "Azure Monitor VM Insights",
          "Network Watcher Connection Monitor",
          "Microsoft Defender for Cloud",
        ],
        answer: 1,
        explanation: "Azure Monitor VM Insights provides pre-built performance charts and dependency maps that correlate application and infrastructure metrics together. It monitors CPU, memory, disk, and network performance and maps running processes and their dependencies without requiring code changes.",
        addedInVersion: "1.5.1",
      },
      {
        id: "5j",
        q: "What is the difference between Azure Service Health and Azure Resource Health?",
        options: [
          "They are the same service with different names",
          "Service Health shows platform-wide Azure incidents and maintenance. Resource Health shows the health status of your specific resources.",
          "Resource Health monitors all Azure services globally. Service Health monitors only your subscription.",
          "Service Health requires a paid plan. Resource Health is free.",
        ],
        answer: 1,
        explanation: "Azure Service Health tracks Azure platform incidents, planned maintenance, and health advisories that could affect your services. Azure Resource Health shows the current and historical health of your individual resources, helping determine if an issue is Azure-side or configuration-related.",
        addedInVersion: "1.5.1",
      },
      {
        id: "5k",
        q: "You want to automatically remediate a non-compliant resource detected by Azure Policy. Which policy effect supports automatic remediation?",
        options: [
          "Audit",
          "Deny",
          "DeployIfNotExists",
          "Append",
        ],
        answer: 2,
        explanation: "DeployIfNotExists automatically deploys a resource or configuration when a non-compliant resource is detected. It requires a managed identity with appropriate permissions to perform the remediation. Audit only logs. Deny blocks. Append adds properties but doesn't deploy new resources.",
        addedInVersion: "1.5.1",
      },
      {
        id: "5l",
        q: "Which KQL query would return the count of events grouped by computer name from the Event table?",
        options: [
          "Event | count by Computer",
          "Event | summarize count() by Computer",
          "Event | group Computer | count",
          "Event | select Computer | summarize",
        ],
        answer: 1,
        explanation: "In KQL, 'summarize count() by Computer' aggregates rows and returns a count per unique Computer value. The 'summarize' operator is used for aggregations in KQL. 'count by', 'group by', and 'select' are not valid KQL syntax for this operation.",
        addedInVersion: "1.5.1",
      },
      {
        id: "5m",
        q: "You need to be notified when the health of any resource in your subscription changes. What should you configure?",
        options: [
          "An Azure Monitor metric alert on all resources",
          "A Service Health alert for Resource Health events",
          "A Log Analytics query scheduled every 5 minutes",
          "Azure Advisor recommendations with email digest",
        ],
        answer: 1,
        explanation: "Service Health alerts can be configured to fire when Resource Health events occur, such as a resource becoming unavailable or degraded. These alerts support action groups for email, SMS, or webhook notifications and cover all resource types in your subscription.",
        addedInVersion: "1.5.1",
      },
      {
        id: "5n",
        q: "What does Azure Advisor provide?",
        options: [
          "Real-time security threat detection across Azure resources",
          "Personalized recommendations across cost, security, reliability, performance, and operational excellence",
          "Automated remediation of policy non-compliance",
          "A centralized log repository for all Azure resource diagnostics",
        ],
        answer: 1,
        explanation: "Azure Advisor analyzes your resource configurations and usage telemetry to provide personalized best practice recommendations across five categories: Cost, Security, Reliability, Performance, and Operational Excellence. It does not remediate automatically but provides actionable guidance.",
        addedInVersion: "1.5.1",
      },
      {
        id: "5o",
        q: "You need to capture all administrative operations performed on Azure resources in a subscription for a compliance audit. Which log source should you query?",
        options: [
          "Azure Monitor Metrics",
          "VM Heartbeat table in Log Analytics",
          "Azure Activity Log",
          "NSG Flow Logs",
        ],
        answer: 2,
        explanation: "The Azure Activity Log records all control plane operations performed on resources — who did what, when, and from where. This includes create, update, and delete operations on any resource in the subscription. It is the primary source for administrative audit trails.",
        addedInVersion: "1.5.1",
      },
      {
        id: "5p",
        q: "A VM has stopped sending heartbeats to Log Analytics. Which KQL query would identify VMs that have not sent a heartbeat in the last 5 minutes?",
        options: [
          "Heartbeat | where TimeGenerated < ago(5m)",
          "Heartbeat | summarize LastHeartbeat = max(TimeGenerated) by Computer | where LastHeartbeat < ago(5m)",
          "Heartbeat | where Computer == 'offline' | last 5m",
          "Heartbeat | count by Computer | where count < 5",
        ],
        answer: 1,
        explanation: "This query summarizes the most recent heartbeat per computer then filters for computers whose last heartbeat was more than 5 minutes ago. The 'ago()' function returns a datetime relative to now. This is a classic pattern for detecting offline or unresponsive VMs.",
        addedInVersion: "1.5.1",
      },
      {
        id: "5q",
        q: "What is the retention period for the Azure Activity Log by default, and how can you extend it?",
        options: [
          "7 days — extend by upgrading to a paid Log Analytics workspace",
          "30 days — extend by sending the Activity Log to a Log Analytics workspace or storage account",
          "90 days — extend by enabling Azure Monitor diagnostic settings",
          "1 year — it cannot be extended beyond this",
        ],
        answer: 1,
        explanation: "The Activity Log retains data for 90 days by default. To retain it longer, configure a diagnostic setting to send the Activity Log to a Log Analytics workspace (up to 2 years with workspace retention settings) or a storage account for indefinite archival.",
        addedInVersion: "1.5.1",
      },
      {
        id: "5r",
        q: "You want to measure the availability of a web endpoint from multiple global locations and alert if it drops below 99%. Which Azure Monitor feature should you use?",
        options: [
          "Azure Monitor Metric Alerts on HTTP response codes",
          "Application Insights Availability Tests",
          "Network Watcher Connection Monitor",
          "Azure Front Door health probes",
        ],
        answer: 1,
        explanation: "Application Insights Availability Tests (URL ping tests or multi-step web tests) continuously probe your endpoint from multiple Azure regions worldwide and alert when availability or response time thresholds are breached. They provide geographic availability visibility and detailed failure diagnostics.",
        addedInVersion: "1.5.1",
      },
    ],
  },
];
